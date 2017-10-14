'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQSerializer, MQMessageV1 } = require('../../');

describe('SerializeSync', () => {
  const sandbox = getSinonSandbox();

  afterEach((done) => {
    sandbox.restore();
    done();
  });


  it('Should return a buffer', () => {
    const serializer = Reflect.construct(MQSerializer, []);
    const mapSpy = sandbox.spy(serializer.messagesVersion, 'get');

    const response = serializer.serializeSync(Reflect.construct(MQMessageV1, [{}]));
    expect(mapSpy.callCount).to.be.equal(1);
    expect(mapSpy.getCall(0).args).to.be.eql(['1']);
    expect(response).to.be.instanceof(Buffer);
    return Promise.resolve();
  });
});
