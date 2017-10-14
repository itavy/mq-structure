'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQMessage } = require('../../');

describe('Initialization', () => {
  const sandbox = getSinonSandbox();

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('Should call setPBSerializer', (done) => {
    const spy = sandbox.spy(MQMessage, 'setPBSerializer');
    MQMessage.getPBSerializer();

    expect(spy.callCount).to.be.equal(1);
    done();
  });
});
