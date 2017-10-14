'use strict';

const { expect } = require('@itavy/test-utilities');
const { MQMessageV1 } = require('../../');

describe('toJSON', () => {
  it('Should return a literal object', (done) => {
    const testMessage = Reflect.construct(MQMessageV1, [{}]).toJSON();
    expect(testMessage).to.be.instanceof(Object);
    expect(testMessage).to.not.be.instanceof(MQMessageV1);
    done();
  });

  it('Should return all required properties', (done) => {
    const testMessage = Reflect.construct(MQMessageV1, [{}]).toJSON();
    expect(testMessage).to.have.all.keys(
      'id', 'replyTo', 'replyOn', 'from', 'to',
      'ts', 'message'
    );
    done();
  });
});
