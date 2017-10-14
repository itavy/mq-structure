'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQSerializer, MQMessageV1 } = require('../../');

describe('Serialize', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = getSinonSandbox();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });


  it('Should return a buffer', () => {
    const serializer = Reflect.construct(MQSerializer, []);
    const spy = sandbox.spy(serializer, 'serializeSync');
    const msgToSerialize = Reflect.construct(MQMessageV1, [{}]);

    return serializer.serialize(msgToSerialize)
      .should.be.fulfilled
      .then((response) => {
        expect(spy.callCount).to.be.equal(1);
        expect(spy.getCall(0).args).to.be.eql([msgToSerialize, '1']);
        expect(response).to.be.instanceof(Buffer);
        return Promise.resolve();
      });
  });
});
