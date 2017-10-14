'use strict';

/**
 * MQMessage structure
 * @memberOf itavy/mq-structure
 */
class MQMessage {
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
    ts = Date.now(),
  } = {}) {
    /**
     * @desc message id
     * @type {String}
     * @member itavy/mq-structure.MQMessage#id
     */

    /**
     * @desc to who it shall reply
     * @type {String}
     * @member itavy/mq-structure.MQMessage#replyTo
     */

    /**
     * @desc where it shall reply
     * @type {String}
     * @member itavy/mq-structure.MQMessage#replyOn
     */

    /**
     * @desc who sent it
     * @type {String}
     * @member itavy/mq-structure.MQMessage#from
     */

    /**
     * @desc to who is this message for
     * @type {String}
     * @member itavy/mq-structure.MQMessage#to
     */

    /**
     * @desc timestamp (in miliseconds) of this message
     * @type {String}
     * @default Date.now(),
     * @member itavy/mq-structure.MQMessage#rs
     */

    /**
     * @desc message to be sent
     * @type {Buffer}
     * @member itavy/mq-structure.MQMessage#message
     */

    Object.defineProperties(this, {
      id: {
        configurable: false,
        enumerable:   true,
        writable:     false,
        value:        id,
      },
      replyTo: {
        configurable: false,
        enumerable:   true,
        writable:     false,
        value:        replyTo,
      },
      replyOn: {
        configurable: false,
        enumerable:   true,
        writable:     false,
        value:        replyOn,
      },
      from: {
        configurable: false,
        enumerable:   true,
        writable:     false,
        value:        from,
      },
      to: {
        configurable: false,
        enumerable:   true,
        writable:     false,
        value:        to,
      },
      ts: {
        configurable: false,
        enumerable:   true,
        writable:     false,
        value:        ts,
      },
      message: {
        configurable: false,
        enumerable:   true,
        writable:     false,
        value:        message,
      },
    });
  }

  /**
   * get literal representation of the message
   * @returns {Object} literal representation of MQMessage
   */
  toJSON() {
    return Object.assign({}, this);
  }
}

module.exports = {
  MQMessage,
};
