'use strict';

var _require = require('../MQSerializer');

const MQSerializer = _require.MQSerializer;


let localSerializer = null;

/**
 * MQMessageV1 structure
 * @memberOf itavy/mq-structure
 */
class MQMessageV1 {
  /**
   * @param {Object} options mq message info
   */
  constructor({
    message,
    id = '',
    replyTo = '',
    replyOn = {},
    from = '',
    to = '',
    ts = Date.now()
  } = {}) {
    /**
     * @desc message id
     * @type {String}
     * @member itavy/mq-structure.MQMessageV1#id
     */

    /**
     * @desc to who it shall reply
     * @type {String}
     * @member itavy/mq-structure.MQMessageV1#replyTo
     */

    /**
     * @desc where it shall reply
     * @type {String}
     * @member itavy/mq-structure.MQMessageV1#replyOn
     */

    /**
     * @desc who sent it
     * @type {String}
     * @member itavy/mq-structure.MQMessageV1#from
     */

    /**
     * @desc to who is this message for
     * @type {String}
     * @member itavy/mq-structure.MQMessageV1#to
     */

    /**
     * @desc timestamp (in miliseconds) of this message
     * @type {String}
     * @default Date.now(),
     * @member itavy/mq-structure.MQMessageV1#rs
     */

    /**
     * @desc message to be sent
     * @type {Buffer}
     * @member itavy/mq-structure.MQMessageV1#message
     */

    Object.defineProperties(this, {
      id: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: id
      },
      replyTo: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: replyTo
      },
      replyOn: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: replyOn
      },
      from: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: from
      },
      to: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: to
      },
      ts: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: ts
      },
      message: {
        configurable: false,
        enumerable: true,
        writable: false,
        value: message
      }
    });
  }

  /**
   * get literal representation of the message
   * @returns {Object} literal representation of MQMessageV1
   */
  toJSON() {
    return Object.assign({}, this);
  }

  /**
   * encode Protobuf this message
   * @returns {Buffer} protobuf encoded message
   */
  toPB() {
    return MQMessageV1.getPBSerializer().serializeSync(this, { version: '1' });
  }

  /**
   * Get Protobuf Serializer singleton
   * @returns {MQSerializer} singleton serializer
   * @private
   */
  static getPBSerializer() {
    if (localSerializer === null) {
      MQMessageV1.setPBSerializer();
    }
    return localSerializer;
  }

  /**
   * set Protobuf singleton serializer
   * @param {String} sourceIdentifier sourceIdentifier
   * @param {MQSerializer} [sSerializer=null] provided serializer
   * @returns {Boolean} true
   * @public
   */
  static setPBSerializer({ sourceIdentifier, sSerializer = null } = {}) {
    if (sSerializer !== null) {
      localSerializer = sSerializer;
      return true;
    }
    localSerializer = Reflect.construct(MQSerializer, [{ sourceIdentifier }]);
    return true;
  }
}

module.exports = {
  MQMessageV1
};