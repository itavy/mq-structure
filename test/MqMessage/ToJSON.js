'use strict';

const expect = require('@itavy/test-utilities').getExpect();
const MQMessage = require('../../lib/v6x').MQMessage;

describe('toJSON', () => {
  it('Should return a literal object', (done) => {
    const testMessage = Reflect.construct(MQMessage, []).toJSON();
    expect(testMessage).to.be.instanceof(Object);
    expect(testMessage).to.not.be.instanceof(MQMessage);
    done();
  });

  it('Should return a required properties', (done) => {
    const testMessage = Reflect.construct(MQMessage, []).toJSON();
    expect(testMessage).to.have.all.keys('id', 'replyTo', 'replyOn', 'from', 'to',
      'ts', 'message');
    done();
  });
});
