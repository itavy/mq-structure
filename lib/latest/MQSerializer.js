'use strict';

const { join } = require('path');
const debug = require('debug')('itavy:mq-structure:serializer');
const protobufLib = require('protobufjs');
const { ExtendedMap } = require('@itavy/extended-map');
const { IError } = require('@itavy/ierror');

const serializationSchema = join(__dirname, '..', 'Definitions', 'itavy_mq_structure.proto');

const defaultInfo = {
  schema:  'itavy.mq.structure.MQMessageV1',
  version: '1',
};

/**
 * MQSerializer class
 */
class MQSerializer {
  /**
   * @param {Object} serializationSchema serializationSchema
   */
  constructor({
    sourceIdentifier = 'itavy.mq-structure',
  } = {}) {
    Reflect.defineProperty(this, 'sourceIdentifier', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        `${sourceIdentifier}.MQSerializer`,
    });

    Reflect.defineProperty(this, 'serializer', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        protobufLib.loadSync(serializationSchema),
    });

    const defaultVersion = Object.assign({}, defaultInfo, {
      serializer: this.serializer.lookup(defaultInfo.schema),
    });

    Reflect.defineProperty(this, 'messagesVersion', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        Reflect.construct(ExtendedMap, [{
        defaultValue:  defaultVersion,
        allowOverrite: false,
      }]),
    });

    // it is faster to have 1:1 second map instead of search in a single map
    Reflect.defineProperty(this, 'reverseMessageVersion', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        Reflect.construct(ExtendedMap, [{
        defaultValue:  1,
        allowOverrite: false,
      }]),
    });

    this.messagesVersion.set('-1', {
      schema:     'itavy.mq.structure.MQMessagePartial',
      serializer: this.serializer.lookup('itavy.mq.structure.MQMessagePartial'),
      version:    null,
    });

    this.messagesVersion.set(defaultVersion.version, defaultVersion);
    this.reverseMessageVersion.set(defaultVersion.schema, defaultVersion.version);
  }

  /**
   * Serialize a structure request
   * @param {Object} request message to be serialized
   * @param {String} [version='1'] default version for serializing message
   * @returns {Promise.<Buffer>} resolves with serialized message
   * @public
   */
  async serialize(request, version = '1') {
    return this.serializeSync(request, version);
  }

  /**
   * Serialize a structure request
   * @param {Object} request message to be serialized
   * @param {String} [version='1'] default version for serializing message
   * @returns {Buffer} resolves with serialized message
   * @public
   */
  serializeSync(request, version = '1') {
    const { schema, serializer } = this.messagesVersion.get(version);
    debug(`Encode message with schema ${schema}`);
    const msgToSerialize = serializer.fromObject(Object.assign(
      request.toJSON(),
      {
        msgType: schema,
      },
    ));
    return serializer.encode(msgToSerialize).finish();
  }

  /**
   * Promisified unserialize
   * @param {Buffer} request message to be unserialized
   * @returns {Promise.<Object>} resolves with unserialized message
   * @public
   */
  async unserialize(request) {
    return this.unserializeSync(request);
  }

  /**
   * Unserialize synchronous
   * @param {Buffer} request message to be unserialized
   * @returns {Object} unserialized message
   * @public
   */
  unserializeSync(request) {
    const { serializer, version } = this.getUnserializer(request);
    const { msgType: _, ...message } = serializer.toObject(
      serializer.decode(request),
      { defaults: true, longs: Number },
    );
    return {
      message,
      version,
    };
  }

  /**
   * get unserializer to decode request
   * @param {Buffer} request message to be unserialized
   * @returns {Promise.<Object>} resolves with serializer for full message
   * @private
   */
  getUnserializer(request) {
    let schema;
    let serializer;

    ({ schema, serializer } = this.messagesVersion.get('-1'));
    const partialSchema = schema;

    const receivedSchema = serializer
      .toObject(serializer.decode(request), { defaults: true }).msgType;
    debug(`Schema to unserialize "${receivedSchema}"`);

    const version = this.reverseMessageVersion.get(receivedSchema);
    ({ schema, serializer } = this.messagesVersion.get(version));
    debug(`Reverse schema received "${schema}"`);
    if (partialSchema === receivedSchema) {
      debug(`Reject with malformed message schema schema "${partialSchema}"`);
      throw Reflect.construct(IError, [{
        name:     'MQ_STRUCTURE_UNSERIALIZE_MALFORMED_SCHEMA',
        source:   `${this.sourceIdentifier}.getUnserializer`,
        message:  `Malformed message schema: "${receivedSchema}"`,
        severity: 'WARNING',
        extra:    {
          receivedSchema,
        },
      }]);
    }

    if (schema === receivedSchema) {
      return {
        serializer,
        version,
      };
    }

    debug(`Reject with unknown schema "${receivedSchema}"`);
    throw Reflect.construct(IError, [{
      name:     'MQ_STRUCTURE_UNSERIALIZE_UNKNOWN_SCHEMA',
      source:   `${this.sourceIdentifier}.getUnserializer`,
      message:  `Unknown schema to unserialize: "${receivedSchema}"`,
      severity: 'WARNING',
      extra:    {
        receivedSchema,
      },
    }]);
  }
}

module.exports = {
  MQSerializer,
};
