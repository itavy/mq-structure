'use strict';

/**
 * @external protobufLib
 * @see {@link https://github.com/dcodeIO/protobuf.js}
 */

/**
 * @namespace itavy/mq-structure
 */
/**
 * @typedef {Object} SerializerOptions
 * @property {String} [debugTag=''] prefix for debugging purpose
 * @property {String} [sourceIdentifier=''] prefix for errors source
 */

const path = require('path');
const debug = require('debug');
const protobufLib = require('protobufjs');
const extendedMap = require('@itavy/extended-map').ExtendedMap;
const IError = require('@itavy/ierror').IError;

const MqMessage = require('./MQMessage').MQMessage;
const MqSerializer = require('./MQSerializer').MQSerializer;

// eslint-disable-next-line require-jsdoc
const getSourceIdentifier = (options) => {
  if (options.sourceIdentifier) {
    return `${options.sourceIdentifier}.itavy.mq-structure`;
  }
  return 'itavy.mq-structure';
};

/**
 * Serializer for MqMessage
 * @param {SerializerOptions} options serializer options
 * @returns {MqSerializer} serializer for MqMessage
 * @public
 */
const getSerializer = (options = {}) => Reflect.construct(MqSerializer, [
  Object.assign({}, options, {
    sourceIdentifier:    getSourceIdentifier(options),
    serializationLib:    protobufLib,
    serializationSchema: path.join(__dirname, '..', 'Definitions', 'itavy_mq_structure.proto'),
    errorBuilder:        IError,
    defaultInfo:         {
      schema:  'itavy.mq.structure.MQMessage',
      builder: MqMessage,
      version: '1',
    },
    builders: [],
    debug:    debug('itavy:mq-structure:serializer'),
    extendedMap,
  }),
]);


module.exports = {
  MqMessage,
  getSerializer,
};
