'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQMessageV1, MQMessage } = require('../../');

describe('Initialization', () => {
  const sandbox = getSinonSandbox();

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('Should set serializer to all versions', (done) => {
    const spy = sandbox.spy(MQMessageV1, 'setPBSerializer');
    MQMessage.setPBSerializer();

    expect(spy.callCount).to.be.equal(1);
    done();
  });
});
