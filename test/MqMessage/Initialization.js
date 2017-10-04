'use strict';

const expect = require('@itavy/test-utilities').getExpect();
const MQMessage = require('../../lib/v6x').MQMessage;

describe('Initialization', () => {
  it('Should return a well formed object', (done) => {
    const testMessage = Reflect.construct(MQMessage, [{}]);
    expect(testMessage).to.have.all.keys('id', 'replyTo', 'replyOn', 'from', 'to',
      'ts', 'message');

    done();
  });

  it('Should have all required methods', (done) => {
    const testMessage = Reflect.construct(MQMessage, [{}]);
    expect(testMessage).to.respondTo('toJSON');

    done();
  });
});
