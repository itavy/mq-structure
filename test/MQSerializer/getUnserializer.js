'use strict';

const { expect } = require('@itavy/test-utilities');
const { MQSerializer } = require('../../');
const fixtures = require('./Fixtures');


describe('getUnserializer', () => {
  it('Should reject with specific error for unknown schema', (done) => {
    const serializer = Reflect.construct(MQSerializer, []);
    const badMessage = fixtures.getV1UnknownSchemaSerializedMessage();
    try {
      serializer.getUnserializer(badMessage);
    } catch (error) {
      expect(error).to.be.instanceof(Error);
      expect(error.name).to.be.equal(fixtures.errors.unknownUnserializeSchema);
      done();
    }
  });

  it('Should resolve with a known unserializer', () => {
    const testSerializer = Reflect.construct(MQSerializer, []);
    const knownMessage = fixtures.getV1SerializedMessage();

    const { serializer, version } = testSerializer.getUnserializer(knownMessage);
    expect(serializer).to.be.have.property('name', fixtures.shortSchema.v1);
    expect(version).to.be.equal(fixtures.shortSchema.version);
    return Promise.resolve();
  });

  it('Should reject with specific error for partial schema', (done) => {
    const serializer = Reflect.construct(MQSerializer, []);
    const malformedMessage = fixtures.getV1PartialSchemaSerializedMessage();

    try {
      serializer.getUnserializer(malformedMessage);
    } catch (error) {
      expect(error).to.be.instanceof(Error);
      expect(error).to.have.property('name', fixtures.errors.partialUnserializeSchema);
      done();
    }
  });
});
