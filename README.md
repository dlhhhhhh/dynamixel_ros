# dynamixel_ros

一个基于 ROS1 catkin 的视觉跟踪云台/双舵机控制工作空间。项目把 USB 摄像头、YOLOv5 目标检测和 DYNAMIXEL 双舵机控制串起来，实现“检测目标中心点 -> 计算偏差 -> 发布舵机位置指令”的闭环流程。

## 项目组成

工作空间主要包含以下几个包：

- `dynamixel_sdk`：ROBOTIS 提供的 DYNAMIXEL SDK。
- `dynamixel_sdk_examples`：DYNAMIXEL ROS 示例节点，包含同步读写节点和本项目使用的跟踪控制脚本。
- `usb_cam-develop`：USB 摄像头驱动，发布图像话题。
- `yolov5_ros`：YOLOv5 的 ROS 封装，订阅相机图像并发布检测结果。
- `yolov5_ros_msgs`：YOLOv5 检测结果消息定义。
- `control`：一个简单的调试/订阅示例包。

## 功能流程

项目的主链路如下：

1. `usb_cam` 发布相机图像 `/usb_cam/image_raw`
2. `yolov5_ros/scripts/yolo_v5.py` 订阅图像并执行检测
3. 检测节点发布：
   - `/yolov5/BoundingBoxes`：检测框结果
   - `/yolov5/detection_image`：带可视化框的图像
   - `/center_coordinates`：目标中心点，消息类型为 `geometry_msgs/Point`
4. `dynamixel_sdk_examples/src/sub.py` 订阅 `/center_coordinates`
5. 该脚本使用卡尔曼滤波 + PID 计算双舵机目标位置，并发布 `/sync_set_position`
6. `dynamixel_sdk_examples/src/sync_read_write_node.cpp` 订阅 `/sync_set_position`，通过串口控制两个 DYNAMIXEL 舵机

## 关键节点

- `usb_cam`
  - 作用：采集 USB 摄像头图像
  - 启动文件：`src/usb_cam-develop/launch/usb_cam.launch`

- `yolov5_ros`
  - 作用：目标检测与中心点发布
  - 启动文件：`src/yolov5_ros/launch/yolo_v5.launch`
  - 默认输入图像：`/usb_cam/image_raw`
  - 默认检测结果：`/yolov5/BoundingBoxes`

- `dynamixel_sdk_examples/sub.py`
  - 作用：将检测中心点转换为双舵机位置命令
  - 发布话题：`/sync_set_position`
  - 订阅话题：`/center_coordinates`

- `dynamixel_sdk_examples/sync_read_write_node`
  - 作用：同步控制两个 DYNAMIXEL 舵机，并提供位置读取服务
  - 订阅话题：`/sync_set_position`
  - 服务：`/sync_get_position`

## 环境要求

建议环境：

- Ubuntu 20.04
- ROS Noetic
- Python 3
- catkin 工具链

运行本项目通常还需要以下 ROS 依赖：

- `roscpp`
- `rospy`
- `std_msgs`
- `sensor_msgs`
- `geometry_msgs`
- `cv_bridge`
- `image_transport`
- `camera_info_manager`

系统依赖通常包括：

- OpenCV
- PyTorch
- `libv4l-dev`
- `ffmpeg`

## 硬件要求

- 2 个 DYNAMIXEL 舵机
- U2D2 或兼容串口适配器
- USB 摄像头
- 舵机默认串口设备为 `/dev/ttyUSB0`

当前 `sync_read_write_node.cpp` 中的默认参数为：

- 舵机 ID：`1`、`2`
- 波特率：`57600`
- 设备名：`/dev/ttyUSB0`

如果你的硬件配置不同，需要修改 [sync_read_write_node.cpp](/home/dlh/dynamixel_ros/src/dynamixel_sdk_examples/src/sync_read_write_node.cpp) 中的宏定义。

## 编译

在工作空间根目录执行：

```bash
catkin_make
source devel/setup.bash
```

## 运行前准备

### 1. 放置 YOLO 权重

`yolo_v5.launch` 默认读取：

```text
$(find yolov5_ros)/weights/best.pt
```

当前仓库中没有现成的 `weights/best.pt`，需要你自行创建 `src/yolov5_ros/weights/` 目录并放入训练好的模型权重，例如：

```bash
mkdir -p src/yolov5_ros/weights
cp /path/to/best.pt src/yolov5_ros/weights/best.pt
```

### 2. 检查串口权限

确认当前用户有权限访问 `/dev/ttyUSB0`，并确认舵机实际连接的设备名与代码一致。

### 3. 检查话题输入

YOLO 节点默认订阅 `/usb_cam/image_raw`，如果你的相机话题不同，需要修改 [yolo_v5.launch](/home/dlh/dynamixel_ros/src/yolov5_ros/launch/yolo_v5.launch) 中的 `image_topic` 参数。

## 启动方式

建议按以下顺序启动：

### 1. 启动 ROS Master

```bash
roscore
```

### 2. 启动摄像头

```bash
source devel/setup.bash
roslaunch usb_cam usb_cam.launch
```

### 3. 启动 YOLOv5 检测

```bash
source devel/setup.bash
roslaunch yolov5_ros yolo_v5.launch
```

### 4. 启动舵机底层同步控制节点

```bash
source devel/setup.bash
rosrun dynamixel_sdk_examples sync_read_write_node
```

### 5. 启动视觉到舵机的跟踪控制脚本

```bash
source devel/setup.bash
rosrun dynamixel_sdk_examples sub.py
```

## 常用调试命令

查看目标中心点：

```bash
rostopic echo /center_coordinates
```

查看舵机控制指令：

```bash
rostopic echo /sync_set_position
```

查看检测框结果：

```bash
rostopic echo /yolov5/BoundingBoxes
```

读取两个舵机当前位置：

```bash
rosservice call /sync_get_position "{id1: 1, id2: 2}"
```

手动给两个舵机发送同步位置命令：

```bash
rostopic pub -1 /sync_set_position dynamixel_sdk_examples/SyncSetPosition "{id1: 1, id2: 2, position1: 1000, position2: 2000}"
```

## 代码说明

### `src/dynamixel_sdk_examples/src/sub.py`

该脚本是本项目的核心控制逻辑：

- 订阅检测中心点 `/center_coordinates`
- 使用卡尔曼滤波平滑目标位置
- 使用 PID 根据目标与图像中心的偏差计算舵机增量
- 对舵机位置做限幅
- 发布 `SyncSetPosition` 到 `/sync_set_position`
- 当连续一段时间收不到新目标时，将舵机恢复到预设位置

当前脚本中的一些关键参数是写死的，包括：

- 图像尺寸：`640 x 480`
- 初始位置：`1000`、`2000`
- 限幅范围：`[500, 1500]`、`[1500, 2500]`
- PID 参数和死区范围

如果相机分辨率或机械结构发生变化，建议优先调整这个文件中的控制参数。

### `src/yolov5_ros/scripts/yolo_v5.py`

该脚本负责：

- 加载本地 YOLOv5 仓库和权重
- 订阅图像并做推理
- 发布 `BoundingBoxes`
- 将检测框中心转换为 `/center_coordinates`
- 发布检测可视化图像 `/yolov5/detection_image`

默认使用 CPU 推理，相关参数在 [yolo_v5.launch](/home/dlh/dynamixel_ros/src/yolov5_ros/launch/yolo_v5.launch) 中配置：

- `use_cpu`
- `weight_path`
- `image_topic`
- `pub_topic`
- `conf`

## 已知限制

- 当前 README 基于仓库现有代码整理，没有包含自动安装依赖脚本。
- `sync_read_write_node.cpp` 中串口、波特率和舵机 ID 目前是硬编码的。
- `sub.py` 中 PID、死区、图像大小和初始位置同样是硬编码的。
- `yolov5_ros` 默认依赖本地 `best.pt` 权重文件，仓库里未提供。
- 如果检测到多个目标，`yolo_v5.py` 会对每个检测框都发布中心点，控制节点实际表现取决于消息到达顺序。

## 目录示意

```text
dynamixel_ros/
├── src/
│   ├── control/
│   ├── dynamixel_sdk/
│   ├── dynamixel_sdk_examples/
│   ├── usb_cam-develop/
│   ├── yolov5_ros/
│   └── yolov5_ros_msgs/
├── build/
└── devel/
```

## 后续建议

如果你准备继续维护这个项目，建议下一步做这几件事：

- 把串口、波特率、舵机 ID、PID 参数改成 ROS 参数
- 增加统一的总启动文件
- 明确只跟踪某一类目标，避免多目标时频繁切换
- 在根目录补充依赖安装脚本或环境说明
