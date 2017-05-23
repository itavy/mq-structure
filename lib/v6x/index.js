'use strict';

const path = require('path');
const debug = require('debug');
const protobufLib = require('protobufjs');
const extendedMap = require('@itavy/extended-map').ExtendedMap;

const MqMessage = require('./MQMessage').MQMessage;
const mqSerializer = require('./MQSerializer').MQSerializer;


// eslint-disable-next-line require-jsdoc
const getSerializer = (options = null) => Reflect.construct(mqSerializer, [
  Object.assign(options || {}, {
    serializationLib:       protobufLib,
    serializationSchema:    path.join(__dirname, '..', 'Definitions', 'itavy_mq_structure.proto'),
    mqStructureConstructor: MqMessage,
    extendedMap,
    debug,
  }),
]);


module.exports = {
  MqMessage,
  getSerializer,
};
