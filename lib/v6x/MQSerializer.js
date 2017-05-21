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
      enumerable:   false,
      writable:     false,
      value:        di.debug,
    });

    Reflect.defineProperty(this, 'serializer', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        di.serializationLib.loadSync(
        di.serializationSchema),
    });

    const defaultVersion = {
      name:       'itavy.mq.structure.MQMessage',
      serializer: this.serializer.lookup('itavy.mq.structure.MQMessage'),
    };

    Reflect.defineProperty(this, 'mqStructureConstructor', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        di.mqStructureConstructor,
    });

    Reflect.defineProperty(this, 'messagesVersion', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        new Proxy(new Map(), {
        get(obj, prop) {
          const origMethod = obj[prop];
          return function fGet(...args) {
            const result = origMethod.apply(obj, args);
            return result || defaultVersion;
          };
        },
      }),
    });

    // it is faster to have 1:1 second map instead of search in a single map
    Reflect.defineProperty(this, 'reverseMessageVersion', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        new Proxy(new Map(), {
        get(obj, prop) {
          const origMethod = obj[prop];
          return function fGet(...args) {
            const result = origMethod.apply(obj, args);
            return result || 1;
          };
        },
      }),
    });

    this.messagesVersion.set('-1', {
      name:       'itavy.mq.structure.MQMessagePartial',
      serializer: this.serializer.lookup('itavy.mq.structure.MQMessagePartial'),
    });

    this.messagesVersion.set('1', defaultVersion);
    this.reverseMessageVersion.set(defaultVersion.name, '1');
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
      const { name, serializer } = this.messagesVersion.get(version);
      this.debug(`Encode message with schema ${name}`);
      resolve(serializer
        .encode(Object.assign(request, {
          msgType: name,
        }))
        .finish());
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
      .then(unserializer => Promise.resolve(unserializer
        .toObject(unserializer.decode(request, { defaults: true }))))
      .then((unserializedRequest) => {
        // @todo remove this when spread operator on object becomes available
        // eslint-disable-next-line no-param-reassign
        delete unserializedRequest.msgType;
        return Promise.resolve(unserializedRequest);
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
      let name;
      let serializer;

      ({ name, serializer } = this.messagesVersion.get('-1'));
      const schema = serializer.toObject(serializer.decode(request, { defaults: true })).msgType;
      this.debug(`Schema to unserialize ${schema}`);

      ({ name, serializer } = this.messagesVersion.get(
        this.reverseMessageVersion.get(schema)));
      this.debug(`Reverse schema received ${name}`);

      if (name === schema) {
        return resolve(serializer);
      }
      // @todo replace with ierror
      return reject('Unknown schema to unserialize');
    });
  }
}

module.exports = {
  MQSerializer,
};
