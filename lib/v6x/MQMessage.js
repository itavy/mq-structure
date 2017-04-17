'use strict';

/**
 * MQMessage structure
 */
class MQMessage {
  /**
   * @param {Object} options mq message info
   */
  constructor(options) {
    this.id = options.id;
    this.replyTo = options.replyTo;
    this.replyOn = options.replyOn;
    this.from = options.from;
    this.to = options.to;
    this.ts = options.ts;
    this.message = options.message;
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
