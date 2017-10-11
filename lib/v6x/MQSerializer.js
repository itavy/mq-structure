'use strict';

/**
 * MQSerializer class
 */
class MQSerializer {
  /**
   * @param {Object} di required dependencies for serializer
   */
  constructor(di) {
    Reflect.defineProperty(this, 'debug', {
      configurable: false,
      enumerable:   true,
      writable:     false,
      value:        di.debug,
    });

    Reflect.defineProperty(this, 'sourceIdentifier', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        `${di.sourceIdentifier}.MQSerializer`,
    });

    Reflect.defineProperty(this, 'errorBuilder', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        di.errorBuilder,
    });

    Reflect.defineProperty(this, 'serializer', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        di.serializationLib.loadSync(di.serializationSchema),
    });

    const defaultVersion = Object.assign({}, di.defaultInfo, {
      serializer: this.serializer.lookup(di.defaultInfo.schema),
    });

    Reflect.defineProperty(this, 'messagesVersion', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        Reflect.construct(di.extendedMap, [{
        defaultValue:  defaultVersion,
        allowOverrite: false,
      }]),
    });

    // it is faster to have 1:1 second map instead of search in a single map
    Reflect.defineProperty(this, 'reverseMessageVersion', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        Reflect.construct(di.extendedMap, [{
        defaultValue:  1,
        allowOverrite: false,
      }]),
    });

    this.messagesVersion.set('-1', {
      schema:     'itavy.mq.structure.MQMessagePartial',
      serializer: this.serializer.lookup('itavy.mq.structure.MQMessagePartial'),
      builder:    null,
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
  serialize(request, version = '1') {
    return new Promise((resolve) => {
      const { schema, serializer } = this.messagesVersion.get(version);
      this.debug(`Encode message with schema ${schema}`);
      const msgToSerialize = serializer.fromObject(Object.assign(
        request.toJSON(),
        {
          msgType: schema,
        },
      ));
      this.debug('msgToSerialize:', msgToSerialize);
      return resolve(serializer.encode(msgToSerialize).finish());
    });
  }

  /**
   * Serialize a structure request
   * @param {Buffer} request message to be unserialized serialized
   * @returns {Promise.<Object>} resolves with unserialized message
   * @public
   */
  unserialize(request) {
    return this.getUnserializer(request)
      .then((unserializeInfo) => {
        const unserializer = unserializeInfo.serializer;
        const { builder } = unserializeInfo;
        const message = unserializer.toObject(
          unserializer.decode(request),
          { defaults: true, longs: Number },
        );
        return Promise.resolve(Reflect.construct(builder, [message]));
      });
  }

  /**
   * get unserializer to decode request
   * @param {Buffer} request message to be unserialized
   * @returns {Promise.<Object>} resolves with serializer for full message
   * @public
   */
  getUnserializer(request) {
    return new Promise((resolve, reject) => {
      let schema;
      let serializer;
      let builder = null;

      ({ schema, serializer } = this.messagesVersion.get('-1'));
      const partialSchema = schema;

      const receivedSchema = serializer
        .toObject(serializer.decode(request), { defaults: true }).msgType;
      this.debug(`Schema to unserialize "${receivedSchema}"`);

      ({ builder, schema, serializer } =
        this.messagesVersion.get(this.reverseMessageVersion.get(receivedSchema)));
      this.debug(`Reverse schema received "${schema}"`);

      if (partialSchema === receivedSchema) {
        this.debug(`Reject with malformed message schema schema "${partialSchema}"`);
        return reject(Reflect.construct(this.errorBuilder, [{
          name:     'MQ_STRUCTURE_UNSERIALIZE_MALFORMED_SCHEMA',
          source:   `${this.sourceIdentifier}.getUnserializer`,
          message:  `Malformed message schema: "${receivedSchema}"`,
          severity: 'WARNING',
          extra:    {
            receivedSchema,
          },
        }]));
      }

      if (schema === receivedSchema) {
        return resolve({
          serializer,
          builder,
        });
      }

      this.debug(`Reject with unknown schema "${receivedSchema}"`);
      return reject(Reflect.construct(this.errorBuilder, [{
        name:     'MQ_STRUCTURE_UNSERIALIZE_UNKNOWN_SCHEMA',
        source:   `${this.sourceIdentifier}.getUnserializer`,
        message:  `Unknown schema to unserialize: "${receivedSchema}"`,
        severity: 'WARNING',
        extra:    {
          receivedSchema,
        },
      }]));
    });
  }
}

module.exports = {
  MQSerializer,
};
