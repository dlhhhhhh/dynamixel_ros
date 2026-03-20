// Auto-generated. Do not edit!

// (in-package yolov5_ros_msgs.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;

//-----------------------------------------------------------

class BoundingBox {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.probability = null;
      this.xmin = null;
      this.ymin = null;
      this.xmax = null;
      this.ymax = null;
      this.num = null;
      this.Class = null;
      this.center_x = null;
      this.center_y = null;
    }
    else {
      if (initObj.hasOwnProperty('probability')) {
        this.probability = initObj.probability
      }
      else {
        this.probability = 0.0;
      }
      if (initObj.hasOwnProperty('xmin')) {
        this.xmin = initObj.xmin
      }
      else {
        this.xmin = 0;
      }
      if (initObj.hasOwnProperty('ymin')) {
        this.ymin = initObj.ymin
      }
      else {
        this.ymin = 0;
      }
      if (initObj.hasOwnProperty('xmax')) {
        this.xmax = initObj.xmax
      }
      else {
        this.xmax = 0;
      }
      if (initObj.hasOwnProperty('ymax')) {
        this.ymax = initObj.ymax
      }
      else {
        this.ymax = 0;
      }
      if (initObj.hasOwnProperty('num')) {
        this.num = initObj.num
      }
      else {
        this.num = 0;
      }
      if (initObj.hasOwnProperty('Class')) {
        this.Class = initObj.Class
      }
      else {
        this.Class = '';
      }
      if (initObj.hasOwnProperty('center_x')) {
        this.center_x = initObj.center_x
      }
      else {
        this.center_x = 0;
      }
      if (initObj.hasOwnProperty('center_y')) {
        this.center_y = initObj.center_y
      }
      else {
        this.center_y = 0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type BoundingBox
    // Serialize message field [probability]
    bufferOffset = _serializer.float64(obj.probability, buffer, bufferOffset);
    // Serialize message field [xmin]
    bufferOffset = _serializer.int64(obj.xmin, buffer, bufferOffset);
    // Serialize message field [ymin]
    bufferOffset = _serializer.int64(obj.ymin, buffer, bufferOffset);
    // Serialize message field [xmax]
    bufferOffset = _serializer.int64(obj.xmax, buffer, bufferOffset);
    // Serialize message field [ymax]
    bufferOffset = _serializer.int64(obj.ymax, buffer, bufferOffset);
    // Serialize message field [num]
    bufferOffset = _serializer.int16(obj.num, buffer, bufferOffset);
    // Serialize message field [Class]
    bufferOffset = _serializer.string(obj.Class, buffer, bufferOffset);
    // Serialize message field [center_x]
    bufferOffset = _serializer.int64(obj.center_x, buffer, bufferOffset);
    // Serialize message field [center_y]
    bufferOffset = _serializer.int64(obj.center_y, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type BoundingBox
    let len;
    let data = new BoundingBox(null);
    // Deserialize message field [probability]
    data.probability = _deserializer.float64(buffer, bufferOffset);
    // Deserialize message field [xmin]
    data.xmin = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [ymin]
    data.ymin = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [xmax]
    data.xmax = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [ymax]
    data.ymax = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [num]
    data.num = _deserializer.int16(buffer, bufferOffset);
    // Deserialize message field [Class]
    data.Class = _deserializer.string(buffer, bufferOffset);
    // Deserialize message field [center_x]
    data.center_x = _deserializer.int64(buffer, bufferOffset);
    // Deserialize message field [center_y]
    data.center_y = _deserializer.int64(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    let length = 0;
    length += _getByteLength(object.Class);
    return length + 62;
  }

  static datatype() {
    // Returns string type for a message object
    return 'yolov5_ros_msgs/BoundingBox';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '7537cfbd43c7ae2b3095fb064f0dc1c6';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    float64 probability
    int64 xmin
    int64 ymin
    int64 xmax
    int64 ymax
    int16 num
    string Class
    int64 center_x
    int64 center_y
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new BoundingBox(null);
    if (msg.probability !== undefined) {
      resolved.probability = msg.probability;
    }
    else {
      resolved.probability = 0.0
    }

    if (msg.xmin !== undefined) {
      resolved.xmin = msg.xmin;
    }
    else {
      resolved.xmin = 0
    }

    if (msg.ymin !== undefined) {
      resolved.ymin = msg.ymin;
    }
    else {
      resolved.ymin = 0
    }

    if (msg.xmax !== undefined) {
      resolved.xmax = msg.xmax;
    }
    else {
      resolved.xmax = 0
    }

    if (msg.ymax !== undefined) {
      resolved.ymax = msg.ymax;
    }
    else {
      resolved.ymax = 0
    }

    if (msg.num !== undefined) {
      resolved.num = msg.num;
    }
    else {
      resolved.num = 0
    }

    if (msg.Class !== undefined) {
      resolved.Class = msg.Class;
    }
    else {
      resolved.Class = ''
    }

    if (msg.center_x !== undefined) {
      resolved.center_x = msg.center_x;
    }
    else {
      resolved.center_x = 0
    }

    if (msg.center_y !== undefined) {
      resolved.center_y = msg.center_y;
    }
    else {
      resolved.center_y = 0
    }

    return resolved;
    }
};

module.exports = BoundingBox;
