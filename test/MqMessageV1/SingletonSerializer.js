'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQSerializer, MQMessageV1 } = require('../../index');

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

  it('Should return an instance of MQSerializer', () => {
    const response = MQMessageV1.getPBSerializer();
    expect(response).to.be.instanceof(MQSerializer);
    return Promise.resolve();
  });

  it('Should return same instance of serializer', () => {
    const s1 = MQMessageV1.getPBSerializer();
    const s2 = MQMessageV1.getPBSerializer();
    expect(s1).to.be.equal(s2);
    return Promise.resolve();
  });

  it('Should set provided serializer', () => {
    const sSerializer = Reflect.construct(MQSerializer, []);
    MQMessageV1.setPBSerializer({ sSerializer });
    const testSerializer = MQMessageV1.getPBSerializer();
    expect(testSerializer).to.be.equal(sSerializer);
    return Promise.resolve();
  });
});
