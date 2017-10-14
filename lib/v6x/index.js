'use strict';

/**
 * @external protobufLib
 * @see {@link https://github.com/dcodeIO/protobuf.js}
 */

/**
 * @namespace itavy/mq-structure
 */

var _require = require('./MQMessage');

const MQMessage = _require.MQMessage;

var _require2 = require('./MQSerializer');

const MQSerializer = _require2.MQSerializer;


module.exports = {
  MQMessage,
  MQSerializer
};