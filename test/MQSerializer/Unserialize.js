'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQSerializer } = require('../../');
//
// const serializationLib = require('../../lib/latest/index');
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

  it('Should call unserializer and reject with specific error', () => {
    const serializer = Reflect.construct(MQSerializer, []);
    const badMessage = fixtures.getV1UnknownSchemaSerializedMessage();

    const getUnserializerSpy = sandbox.spy(serializer, 'getUnserializer');

    return serializer.unserialize(badMessage)
      .should.be.rejected
      .then((response) => {
        expect(getUnserializerSpy.callCount).to.be.equal(1);
        expect(getUnserializerSpy.getCall(0).args[0]).to.be.eql(badMessage);

        expect(response).to.be.instanceof(Error);
        expect(response.name).to.be.equal(fixtures.errors.unknownUnserializeSchema);
        return Promise.resolve();
      });
  });

  it('Should resolve with an object', () => {
    const serializer = Reflect.construct(MQSerializer, []);
    const message = fixtures.getV1SerializedMessage();

    return serializer.unserialize(message)
      .should.be.fulfilled
      .then((response) => {
        expect(response).to.be.instanceof(Object);
        return Promise.resolve();
      });
  });
});
