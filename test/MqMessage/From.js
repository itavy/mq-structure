'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQMessageV1, MQMessage } = require('../../');

describe('From', () => {
  const sandbox = getSinonSandbox();
  const serializedMessage = new MQMessageV1().toPB();

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('Should call fromSync', () => {
    const spy = sandbox.spy(MQMessage, 'fromSync');
    return MQMessage.from(serializedMessage)
      .should.be.fulfilled
      .then(() => {
        expect(spy.callCount).to.be.equal(1);
        return Promise.resolve();
      });
  });

  it('Should return an instance of MQMessageV1', () => MQMessage.from(serializedMessage)
    .should.be.fulfilled
    .then((response) => {
      expect(response).to.be.instanceof(MQMessageV1);
      return Promise.resolve();
    }));
});
