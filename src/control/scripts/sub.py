from geometry_msgs.msg import Point
import rospy

class Yolo_Dect:
    def __init__(self):
        # 其他初始化代码...

        # 初始化center_pub主题
        self.center_pub = rospy.Publisher('/center_coordinates', Point, queue_size=10)

        # 订阅center_pub主题
        rospy.Subscriber('/center_coordinates', Point, self.center_callback)

    # 回调函数处理接收到的消息
    def center_callback(self, data):
        # 处理接收到的消息，并输出目标中心坐标
        rospy.loginfo("Received center coordinates: x={}, y={}, z={}".format(data.x, data.y, data.z))

    # 其他方法...

def main():
    rospy.init_node('yolov5_ros', anonymous=True)
    yolo_dect = Yolo_Dect()
    rospy.spin()

if __name__ == "__main__":
    main()
