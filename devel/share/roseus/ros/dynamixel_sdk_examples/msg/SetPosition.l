;; Auto-generated. Do not edit!


(when (boundp 'dynamixel_sdk_examples::SetPosition)
  (if (not (find-package "DYNAMIXEL_SDK_EXAMPLES"))
    (make-package "DYNAMIXEL_SDK_EXAMPLES"))
  (shadow 'SetPosition (find-package "DYNAMIXEL_SDK_EXAMPLES")))
(unless (find-package "DYNAMIXEL_SDK_EXAMPLES::SETPOSITION")
  (make-package "DYNAMIXEL_SDK_EXAMPLES::SETPOSITION"))

(in-package "ROS")
;;//! \htmlinclude SetPosition.msg.html


(defclass dynamixel_sdk_examples::SetPosition
  :super ros::object
  :slots (_id _id2 _position _position2 ))

(defmethod dynamixel_sdk_examples::SetPosition
  (:init
   (&key
    ((:id __id) 0)
    ((:id2 __id2) 0)
    ((:position __position) 0)
    ((:position2 __position2) 0)
    )
   (send-super :init)
   (setq _id (round __id))
   (setq _id2 (round __id2))
   (setq _position (round __position))
   (setq _position2 (round __position2))
   self)
  (:id
   (&optional __id)
   (if __id (setq _id __id)) _id)
  (:id2
   (&optional __id2)
   (if __id2 (setq _id2 __id2)) _id2)
  (:position
   (&optional __position)
   (if __position (setq _position __position)) _position)
  (:position2
   (&optional __position2)
   (if __position2 (setq _position2 __position2)) _position2)
  (:serialization-length
   ()
   (+
    ;; uint8 _id
    1
    ;; uint8 _id2
    1
    ;; int32 _position
    4
    ;; int32 _position2
    4
    ))
  (:serialize
   (&optional strm)
   (let ((s (if strm strm
              (make-string-output-stream (send self :serialization-length)))))
     ;; uint8 _id
       (write-byte _id s)
     ;; uint8 _id2
       (write-byte _id2 s)
     ;; int32 _position
       (write-long _position s)
     ;; int32 _position2
       (write-long _position2 s)
     ;;
     (if (null strm) (get-output-stream-string s))))
  (:deserialize
   (buf &optional (ptr- 0))
   ;; uint8 _id
     (setq _id (sys::peek buf ptr- :char)) (incf ptr- 1)
   ;; uint8 _id2
     (setq _id2 (sys::peek buf ptr- :char)) (incf ptr- 1)
   ;; int32 _position
     (setq _position (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;; int32 _position2
     (setq _position2 (sys::peek buf ptr- :integer)) (incf ptr- 4)
   ;;
   self)
  )

(setf (get dynamixel_sdk_examples::SetPosition :md5sum-) "086f23b0353cf484b4bd30c53e073691")
(setf (get dynamixel_sdk_examples::SetPosition :datatype-) "dynamixel_sdk_examples/SetPosition")
(setf (get dynamixel_sdk_examples::SetPosition :definition-)
      "uint8 id
uint8 id2
int32 position
int32 position2

")



(provide :dynamixel_sdk_examples/SetPosition "086f23b0353cf484b4bd30c53e073691")


