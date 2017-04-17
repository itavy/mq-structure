'use strict';

/**
 * MQSerializer class
 */
class MQSerializer {
  /**
   * @param {Object} di required dependencies for serializer
   */
  constructor(di) {
    Reflect.defineProperty(this, 'serializer', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        di.serializationLib.loadSync(
        di.serializationSchema),
    });

    Reflect.defineProperty(this, 'mqStructureConstructor', {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        di.mqStructureConstructor,
    });
  }

  /**
   * Serialize a structure request
   * @param {Object} request message to be serialized
   * @returns {Promise.<Buffer>} resolves with serialized message
   */
  serialize(request) {
    return this.serializer.serialize(request);
  }

  /**
   * Serialize a structure request
   * @param {Buffer} request message to be unserialized serialized
   * @returns {Promise.<MQStructure>} resolves with serialized message
   */
  unserialize(request) {
    return this.serializer.unserialize(request);
  }
}

module.exports = {
  MQSerializer,
};
