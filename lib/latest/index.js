'use strict';

/**
 * @external protobufLib
 * @see {@link https://github.com/dcodeIO/protobuf.js}
 */

/**
 * @namespace itavy/mq-structure
 */

const { MQMessageV1 } = require('./Versions/MQMessageV1');
const { MQSerializer } = require('./MQSerializer');
const { MQMessage } = require('./MQMessage');

module.exports = {
  MQMessage,
  MQMessageV1,
  MQSerializer,
};
