import numpy as np
import time
from geometry_msgs.msg import Point
import rospy
from dynamixel_sdk_examples.msg import SyncSetPosition

class Yolo_Dect:
    def __init__(self):
        rospy.init_node('yolov5_ros', anonymous=True)

        # 初始化center_pub主题
        self.center_pub = rospy.Publisher('/sync_set_position', SyncSetPosition, queue_size=10)

        # 订阅center_pub主题
        rospy.Subscriber('/center_coordinates', Point, self.center_callback)

        # 舵机编号
        self.dxl1_id = 1
        self.dxl2_id = 2

        # 舵机初始角度
        self.current_position1 = 1000
        self.current_position2 = 2000

        # 画面大小
        self.image_width = 640
        self.image_height = 480

        # PID参数
        self.kp1 = 0.26
        self.ki1 = 0.01
        self.kd1 = 0.06
        self.kp2 = 0.23
        self.ki2 = 0.01
        self.kd2 = 0.05

        # 死区范围
        self.deadzone1 = 50  # 设定为20个像素单位
        self.deadzone2 = 40

        # PID误差
        self.error_sum1 = 0
        self.error_sum2 = 0
        self.prev_error1 = 0
        self.prev_error2 = 0

        # 卡尔曼滤波器
        self.kalman_filter1 = KalmanFilter()
        self.kalman_filter2 = KalmanFilter()

        # 上一次接收到的坐标
        self.last_received_x = 320
        self.last_received_y = 240

        # 标志是否接收到新消息
        self.received_new_message = False
        self.flag = 0
        # 定时器
        self.timer = rospy.Timer(rospy.Duration(0.1), self.timer_callback)

    # 回调函数处理接收到的消息
    def center_callback(self, data):
        # 更新上一次接收到的坐标
        self.last_received_x = data.x
        self.last_received_y = data.y
        self.received_new_message = True

    # 定时器回调函数，用于周期性检查是否有新的坐标消息
    def timer_callback(self, event):
        if not self.received_new_message:
            if self.flag < 20:
                rospy.logwarn("No new coordinates received, using previous coordinates.")
                # 如果没有收到新消息，则使用之前的坐标信息进行舵机控制
                kalman_x, kalman_y = self.kalman_filter1.update(self.last_received_x, self.last_received_y)
                self.last_received_x = kalman_x
                self.last_received_y = kalman_y
                self.flag = self.flag + 1
                self.calculate_servo_positions(kalman_x, kalman_y)
            else:
                # 发布舵机角度信息
                msg = SyncSetPosition()
                msg.id1 = self.dxl1_id
                msg.position1 = 1000
                msg.id2 = self.dxl2_id
                msg.position2 = 2000
                self.publish_position(msg)
        else:
            rospy.loginfo("Received center coordinates: x={}, y={}".format(self.last_received_x, self.last_received_y))
            # 用卡尔曼滤波器估计新坐标
            kalman_x, kalman_y = self.kalman_filter1.update(self.last_received_x, self.last_received_y)
            # 计算舵机应该转动的角度
            self.calculate_servo_positions(kalman_x, kalman_y)
            self.received_new_message = False
            self.flag = 0


    # 计算舵机角度
    def calculate_servo_positions(self, x, y):
        # 计算目标在画面中心的偏移量
        dx = self.image_width / 2 - x
        dy = self.image_height / 2 - y

        # 在死区范围内的偏移量不需要调整舵机角度
        if abs(dx) < self.deadzone1:
            dx = 0
        if abs(dy) < self.deadzone2:
            dy = 0

        # 计算PID控制量
        pid_output1 = self.kp1 * dx + self.ki1 * self.error_sum1 + self.kd1 * (dx - self.prev_error1)
        pid_output2 = self.kp2 * dy + self.ki2 * self.error_sum2 + self.kd2 * (dy - self.prev_error2)

        # 更新PID误差
        self.error_sum1 += dx
        self.error_sum2 += dy
        self.prev_error1 = dx
        self.prev_error2 = dy

        # 计算新的舵机角度
        position1 = int(self.current_position1 + pid_output1)
        position2 = int(self.current_position2 - pid_output2)

        # 将舵机角度限制在特定范围内
        position1 = max(500, min(position1, 1500))
        position2 = max(1500, min(position2, 2500))

        # 发布舵机角度信息
        msg = SyncSetPosition()
        msg.id1 = self.dxl1_id
        msg.position1 = position1
        msg.id2 = self.dxl2_id
        msg.position2 = position2
        self.publish_position(msg)

        # 更新舵机初始角度
        self.current_position1 = position1
        self.current_position2 = position2

    # 发布舵机角度信息
    def publish_position(self, msg):
        self.center_pub.publish(msg)

class KalmanFilter:
    def __init__(self):
        self.X = np.zeros((4, 1))
        self.P = np.eye(4)
        self.Q = np.diag([0.01, 0.01, 0.01, 0.01])
        self.R = np.diag([0.01, 0.01])
        self.H = np.array([[1, 0, 0, 0],[0, 1, 0, 0]])

    def update(self, x, y):
        self.X[0, 0] = self.X[0, 0] + self.X[2, 0]
        self.X[1, 0] = self.X[1, 0] + self.X[3, 0]
        self.P = self.P + self.Q
        Z = np.array([[x], [y]])
        K = np.dot(np.dot(self.P, self.H.T), np.linalg.inv(np.dot(np.dot(self.H, self.P), self.H.T) + self.R))
        self.X = self.X + np.dot(K, (Z - np.dot(self.H, self.X)))
        self.P = np.dot((np.eye(4) - np.dot(K, self.H)), self.P)
        return self.X[0, 0], self.X[1, 0]

def main():
    yolo_dect = Yolo_Dect()
    rospy.spin()

if __name__ == "__main__":
    main()
