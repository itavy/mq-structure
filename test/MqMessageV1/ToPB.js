'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQSerializer, MQMessageV1 } = require('../../');

describe('Singleton serializer', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = getSinonSandbox();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('Should call serializer sync method', () => {
    const message = Reflect.construct(MQMessageV1, []);
    const spy = sandbox.spy(MQSerializer.prototype, 'serializeSync');
    message.toPB();
    expect(spy.callCount).to.be.equal(1);
    return Promise.resolve();
  });

  it('Should return a buffer', () => {
    const response = Reflect.construct(MQMessageV1, []).toPB();

    expect(response).to.be.instanceof(Buffer);
    return Promise.resolve();
  });
});
