// Auto-generated. Do not edit!

// (in-package dynamixel_sdk_examples.msg)


"use strict";

const _serializer = _ros_msg_utils.Serialize;
const _arraySerializer = _serializer.Array;
const _deserializer = _ros_msg_utils.Deserialize;
const _arrayDeserializer = _deserializer.Array;
const _finder = _ros_msg_utils.Find;
const _getByteLength = _ros_msg_utils.getByteLength;

//-----------------------------------------------------------

class SetPosition {
  constructor(initObj={}) {
    if (initObj === null) {
      // initObj === null is a special case for deserialization where we don't initialize fields
      this.id = null;
      this.id2 = null;
      this.position = null;
      this.position2 = null;
    }
    else {
      if (initObj.hasOwnProperty('id')) {
        this.id = initObj.id
      }
      else {
        this.id = 0;
      }
      if (initObj.hasOwnProperty('id2')) {
        this.id2 = initObj.id2
      }
      else {
        this.id2 = 0;
      }
      if (initObj.hasOwnProperty('position')) {
        this.position = initObj.position
      }
      else {
        this.position = 0;
      }
      if (initObj.hasOwnProperty('position2')) {
        this.position2 = initObj.position2
      }
      else {
        this.position2 = 0;
      }
    }
  }

  static serialize(obj, buffer, bufferOffset) {
    // Serializes a message object of type SetPosition
    // Serialize message field [id]
    bufferOffset = _serializer.uint8(obj.id, buffer, bufferOffset);
    // Serialize message field [id2]
    bufferOffset = _serializer.uint8(obj.id2, buffer, bufferOffset);
    // Serialize message field [position]
    bufferOffset = _serializer.int32(obj.position, buffer, bufferOffset);
    // Serialize message field [position2]
    bufferOffset = _serializer.int32(obj.position2, buffer, bufferOffset);
    return bufferOffset;
  }

  static deserialize(buffer, bufferOffset=[0]) {
    //deserializes a message object of type SetPosition
    let len;
    let data = new SetPosition(null);
    // Deserialize message field [id]
    data.id = _deserializer.uint8(buffer, bufferOffset);
    // Deserialize message field [id2]
    data.id2 = _deserializer.uint8(buffer, bufferOffset);
    // Deserialize message field [position]
    data.position = _deserializer.int32(buffer, bufferOffset);
    // Deserialize message field [position2]
    data.position2 = _deserializer.int32(buffer, bufferOffset);
    return data;
  }

  static getMessageSize(object) {
    return 10;
  }

  static datatype() {
    // Returns string type for a message object
    return 'dynamixel_sdk_examples/SetPosition';
  }

  static md5sum() {
    //Returns md5sum for a message object
    return '086f23b0353cf484b4bd30c53e073691';
  }

  static messageDefinition() {
    // Returns full string definition for message
    return `
    uint8 id
    uint8 id2
    int32 position
    int32 position2
    
    `;
  }

  static Resolve(msg) {
    // deep-construct a valid message object instance of whatever was passed in
    if (typeof msg !== 'object' || msg === null) {
      msg = {};
    }
    const resolved = new SetPosition(null);
    if (msg.id !== undefined) {
      resolved.id = msg.id;
    }
    else {
      resolved.id = 0
    }

    if (msg.id2 !== undefined) {
      resolved.id2 = msg.id2;
    }
    else {
      resolved.id2 = 0
    }

    if (msg.position !== undefined) {
      resolved.position = msg.position;
    }
    else {
      resolved.position = 0
    }

    if (msg.position2 !== undefined) {
      resolved.position2 = msg.position2;
    }
    else {
      resolved.position2 = 0
    }

    return resolved;
    }
};

module.exports = SetPosition;
