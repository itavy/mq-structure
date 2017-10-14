'use strict';

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('path');

const join = _require.join;

const debug = require('debug')('itavy:mq-structure:serializer');
const protobufLib = require('protobufjs');

var _require2 = require('@itavy/extended-map');

const ExtendedMap = _require2.ExtendedMap;

var _require3 = require('@itavy/ierror');

const IError = _require3.IError;


const defaultSerializationSchema = join(__dirname, '..', 'Definitions', 'itavy_mq_structure.proto');

const defaultSettings = {
  schema: 'itavy.mq.structure.MQMessage',
  version: '1'
};
/**
 * MQSerializer class
 */
class MQSerializer {
  /**
   * @param {String} sourceIdentifier sourceIdentifier
   * @param {Object} serializationSchema serializationSchema
   * @param {Object} defaultInfo defaultInfo
   */
  constructor({
    defaultInfo = defaultSettings,
    sourceIdentifier = 'itavy.mq-structure',
    serializationSchema = defaultSerializationSchema
  } = {}) {
    Reflect.defineProperty(this, 'sourceIdentifier', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: `${sourceIdentifier}.MQSerializer`
    });

    Reflect.defineProperty(this, 'serializer', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: protobufLib.loadSync(serializationSchema)
    });

    const defaultVersion = Object.assign({}, defaultInfo, {
      serializer: this.serializer.lookup(defaultInfo.schema)
    });

    Reflect.defineProperty(this, 'messagesVersion', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Reflect.construct(ExtendedMap, [{
        defaultValue: defaultVersion,
        allowOverrite: false
      }])
    });

    // it is faster to have 1:1 second map instead of search in a single map
    Reflect.defineProperty(this, 'reverseMessageVersion', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: Reflect.construct(ExtendedMap, [{
        defaultValue: 1,
        allowOverrite: false
      }])
    });

    this.messagesVersion.set('-1', {
      schema: 'itavy.mq.structure.MQMessagePartial',
      serializer: this.serializer.lookup('itavy.mq.structure.MQMessagePartial'),
      version: null
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
    var _this = this;

    return _asyncToGenerator(function* () {
      var _messagesVersion$get = _this.messagesVersion.get(version);

      const schema = _messagesVersion$get.schema,
            serializer = _messagesVersion$get.serializer;

      debug(`Encode message with schema ${schema}`);
      const msgToSerialize = serializer.fromObject(Object.assign(request.toJSON(), {
        msgType: schema
      }));
      return serializer.encode(msgToSerialize).finish();
    })();
  }

  /**
   * Serialize a structure request
   * @param {Buffer} request message to be unserialized serialized
   * @returns {Promise.<Object>} resolves with unserialized message
   * @public
   */
  unserialize(request) {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      var _ref = yield _this2.getUnserializer(request);

      const serializer = _ref.serializer;

      var _serializer$toObject = serializer.toObject(serializer.decode(request), { defaults: true, longs: Number });

      const _ = _serializer$toObject.msgType,
            message = _objectWithoutProperties(_serializer$toObject, ['msgType']);

      return message;
    })();
  }

  /**
   * get unserializer to decode request
   * @param {Buffer} request message to be unserialized
   * @returns {Promise.<Object>} resolves with serializer for full message
   * @public
   */
  getUnserializer(request) {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      let schema;
      let serializer;

      var _messagesVersion$get2 = _this3.messagesVersion.get('-1');

      schema = _messagesVersion$get2.schema;
      serializer = _messagesVersion$get2.serializer;

      const partialSchema = schema;

      const receivedSchema = serializer.toObject(serializer.decode(request), { defaults: true }).msgType;
      debug(`Schema to unserialize "${receivedSchema}"`);

      var _messagesVersion$get3 = _this3.messagesVersion.get(_this3.reverseMessageVersion.get(receivedSchema));

      schema = _messagesVersion$get3.schema;
      serializer = _messagesVersion$get3.serializer;

      debug(`Reverse schema received "${schema}"`);
      if (partialSchema === receivedSchema) {
        debug(`Reject with malformed message schema schema "${partialSchema}"`);
        throw Reflect.construct(IError, [{
          name: 'MQ_STRUCTURE_UNSERIALIZE_MALFORMED_SCHEMA',
          source: `${_this3.sourceIdentifier}.getUnserializer`,
          message: `Malformed message schema: "${receivedSchema}"`,
          severity: 'WARNING',
          extra: {
            receivedSchema
          }
        }]);
      }

      if (schema === receivedSchema) {
        return { serializer };
      }

      debug(`Reject with unknown schema "${receivedSchema}"`);
      throw Reflect.construct(IError, [{
        name: 'MQ_STRUCTURE_UNSERIALIZE_UNKNOWN_SCHEMA',
        source: `${_this3.sourceIdentifier}.getUnserializer`,
        message: `Unknown schema to unserialize: "${receivedSchema}"`,
        severity: 'WARNING',
        extra: {
          receivedSchema
        }
      }]);
    })();
  }
}

module.exports = {
  MQSerializer
};