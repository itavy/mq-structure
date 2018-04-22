'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQSerializer } = require('../../');
const fixtures = require('./Fixtures');


describe('Unserialize', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = getSinonSandbox();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('Should resolve with an object', () => {
    const serializer = Reflect.construct(MQSerializer, []);
    const message = fixtures.getV1SerializedMessage();
    const spy = sandbox.spy(serializer, 'unserializeSync');

    return serializer.unserialize(message)
      .should.be.fulfilled
      .then((response) => {
        expect(response).to.be.instanceof(Object);
        expect(spy.callCount).to.be.equal(1);
        expect(spy.getCall(0).args).to.be.eql([message]);
        return Promise.resolve();
      });
  });
});
