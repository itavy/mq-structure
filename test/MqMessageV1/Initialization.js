'use strict';

const { expect } = require('@itavy/test-utilities');
const { MQMessageV1 } = require('../../');

describe('Initialization', () => {
  it('Should return a well formed object', (done) => {
    const testMessage = Reflect.construct(MQMessageV1, []);
    expect(testMessage).to.have.all.keys(
      'id', 'replyTo', 'replyOn', 'from', 'to',
      'ts', 'message'
    );

    done();
  });

  it('Should have all required methods', (done) => {
    const testMessage = Reflect.construct(MQMessageV1, [{}]);
    expect(testMessage).to.respondTo('toJSON');

    done();
  });
});
