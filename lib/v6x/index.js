'use strict';

/**
 * @external protobufLib
 * @see {@link https://github.com/dcodeIO/protobuf.js}
 */

/**
 * @namespace itavy/mq-structure
 */

var _require = require('./Versions/MQMessageV1');

const MQMessageV1 = _require.MQMessageV1;

var _require2 = require('./MQSerializer');

const MQSerializer = _require2.MQSerializer;

var _require3 = require('./MQMessage');

const MQMessage = _require3.MQMessage;


module.exports = {
  MQMessage,
  MQMessageV1,
  MQSerializer
};