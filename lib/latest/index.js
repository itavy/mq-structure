'use strict';

/**
 * @external protobufLib
 * @see {@link https://github.com/dcodeIO/protobuf.js}
 */

/**
 * @namespace itavy/mq-structure
 */

const { MQMessage } = require('./MQMessage');
const { MQSerializer } = require('./MQSerializer');


module.exports = {
  MQMessage,
  MQSerializer,
};
