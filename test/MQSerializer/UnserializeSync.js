'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQSerializer } = require('../../');
const fixtures = require('./Fixtures');


describe('UnserializeSync', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = getSinonSandbox();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('Should call unserializer and throw specific error', (done) => {
    const serializer = Reflect.construct(MQSerializer, []);
    const badMessage = fixtures.getV1UnknownSchemaSerializedMessage();

    const getUnserializerSpy = sandbox.spy(serializer, 'getUnserializer');

    try {
      serializer.unserializeSync(badMessage);
    } catch (error) {
      expect(getUnserializerSpy.callCount).to.be.equal(1);
      expect(getUnserializerSpy.getCall(0).args[0]).to.be.eql(badMessage);

      expect(error).to.be.instanceof(Error);
      expect(error).to.have.property('name', fixtures.errors.unknownUnserializeSchema);

      done();
    }
  });

  it('Should resolve with an object', () => {
    const serializer = Reflect.construct(MQSerializer, []);
    const message = fixtures.getV1SerializedMessage();

    expect(serializer.unserializeSync(message)).to.be.instanceof(Object);
    return Promise.resolve();
  });
});
