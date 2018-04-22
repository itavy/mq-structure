'use strict';

const pbLib = require('protobufjs');
const { join } = require('path');
const { MQMessageV1 } = require('../../');

const pbFile = join(__dirname, '..', '..', 'lib', 'Definitions', 'itavy_mq_structure.proto');
const pbNamespace = 'itavy.mq.structure';

const serializer = pbLib.loadSync(pbFile);

const testMessage = Reflect.construct(MQMessageV1, [{
  id:      'testingId',
  replyTo: 'testReplyTo',
  replyOn: {
    queue:    'testReplyOn',
    exchange: 'testExchange',
  },
  from:    'testFrom',
  to:      'testTo',
  ts:      1234567890,
  message: Buffer.from('test message'),
}]);

const shortSchema = {
  partial: 'MQMessagePartial',
  v1:      'MQMessageV1',
  version: '1',
};

const fullSchema = {
  partial: `${pbNamespace}.${shortSchema.partial}`,
  v1:      `${pbNamespace}.${shortSchema.v1}`,
  version: shortSchema.version,
};

const errors = {
  unknownUnserializeSchema: 'MQ_STRUCTURE_UNSERIALIZE_UNKNOWN_SCHEMA',
  partialUnserializeSchema: 'MQ_STRUCTURE_UNSERIALIZE_MALFORMED_SCHEMA',
};

/**
 * v1 pb serializer
 * @param {Object} [message] message to be serialized
 * @returns {Buffer} message pb serialized
 */
const getV1SerializedMessage = (message = {}) => {
  const v1Serializer = serializer.lookup(fullSchema.v1);
  const msgToSerialize = Reflect.construct(MQMessageV1, [message]);
  return v1Serializer
    .encode(v1Serializer.fromObject(Object.assign(msgToSerialize.toJSON(), {
      msgType: fullSchema.v1,
    })))
    .finish();
};

/**
 * V1 Unknown schema pb serializer
 * @param {Object} [message] message to be serialized
 * @returns {Buffer} message pb serialized
 */
const getV1UnknownSchemaSerializedMessage = (message = {}) => {
  const v1Serializer = serializer.lookup(fullSchema.v1);
  const msgToSerialize = Reflect.construct(MQMessageV1, [message]);
  return v1Serializer
    .encode(v1Serializer.fromObject(Object.assign(msgToSerialize.toJSON(), {
      msgType: 'UNKNOWNSCHEMA',
    })))
    .finish();
};

/**
 * V1 Partial schema pb serializer
 * @param {Object} [message] message to be serialized
 * @returns {Buffer} message pb serialized
 */
const getV1PartialSchemaSerializedMessage = (message = {}) => {
  const v1Serializer = serializer.lookup(fullSchema.v1);
  const msgToSerialize = Reflect.construct(MQMessageV1, [message]);
  return v1Serializer
    .encode(v1Serializer.fromObject(Object.assign(msgToSerialize.toJSON(), {
      msgType: fullSchema.partial,
    })))
    .finish();
};

module.exports = {
  serializer,
  pbFile,
  pbNamespace,
  shortSchema,
  fullSchema,
  errors,
  testMessage,
  getV1SerializedMessage,
  getV1UnknownSchemaSerializedMessage,
  getV1PartialSchemaSerializedMessage,
};
