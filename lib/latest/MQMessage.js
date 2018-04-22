'use strict';

const { MQMessageV1 } = require('./Versions/MQMessageV1');
const { IError } = require('@itavy/ierror');
const { MQSerializer } = require('./MQSerializer');

let sSerializer = null;
let mqMessageSource = 'itavy.mq-structure.MQMessage';
/**
 * MQMessage factory class
 */
class MQMessage {
  /**
   * create mq message from a buffer or from an object
   * @param {Buffer|Object} request request to be decoded
   * @param {Object} [version=MQMessageV1] class instance for building request
   * @returns {MQMessageV1} mq message
   * @public
   */
  static fromSync(request, version = MQMessageV1) {
    MQMessage.getPBSerializer();
    let lRequest = request;
    let lVersion = version;
    if (request instanceof Buffer) {
      ({ message: lRequest, version: lVersion } =
        MQMessage.getPBSerializer().unserializeSync(request));
      if (lVersion === '1') {
        lVersion = MQMessageV1;
      }
    }
    if (lVersion === MQMessageV1) {
      return Reflect.construct(MQMessageV1, [lRequest]);
    }
    throw Reflect.construct(IError, [{
      name:   'MQ_STRUCTURE_UNKNOWN_MESSAGE_VERSION',
      source: `${mqMessageSource}.constructor`,
      extra:  {
        lVersion,
      },
    }]);
  }

  /**
   * create mq message from a buffer or from an object
   * @param {Buffer|Object} request request to be decoded
   * @param {String} [version=1] version for creating mq message
   * @returns {Promise.<MQMessageV1>} resolves with decoded message
   * @public
   */
  static async from(request, version = '1') {
    return MQMessage.fromSync(request, version);
  }

  /**
   * Get Protobuf Serializer singleton
   * @returns {MQSerializer} singleton serializer
   * @private
   */
  static getPBSerializer() {
    if (sSerializer === null) {
      MQMessage.setPBSerializer();
    }
    return sSerializer;
  }

  /**
   * set Protobuf singleton serializer
   * @param {String} [sourceIdentifier='itavy.mq-structure'] sourceIdentifier
   * @returns {undefined}
   * @public
   */
  static setPBSerializer({ sourceIdentifier = 'itavy.mq-structure' } = {}) {
    mqMessageSource = `${sourceIdentifier}.MQMessage`;
    sSerializer = Reflect.construct(MQSerializer, [{ sourceIdentifier }]);
    MQMessageV1.setPBSerializer({ sSerializer });
  }
}

module.exports = {
  MQMessage,
};
