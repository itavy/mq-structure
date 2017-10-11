'use strict';

const { expect } = require('@itavy/test-utilities');
const { getSerializer } = require('../../lib/v6x');
const fixtures = require('./Fixtures');


describe('getUnserializer', () => {
  it('Should reject with specific error for unknown schema', () => {
    const serializer = getSerializer();
    const badMessage = fixtures.getV1UnknownSchemaSerializedMessage();

    return serializer.getUnserializer(badMessage)
      .should.be.rejected
      .then((response) => {
        expect(response).to.be.instanceof(Error);
        expect(response.name).to.be.equal(fixtures.errors.unknownUnserializeSchema);
        return Promise.resolve();
      });
  });

  it('Should resolve with a known unserializer', () => {
    const serializer = getSerializer();
    const knownMessage = fixtures.getV1SerializedMessage();

    return serializer.getUnserializer(knownMessage)
      .should.be.fulfilled
      .then((response) => {
        expect(response.serializer.name).to.be.equal(fixtures.shortSchema.v1);
        return Promise.resolve();
      });
  });

  it('Should reject with specific error for partial schema', () => {
    const serializer = getSerializer();
    const malformedMessage = fixtures.getV1PartialSchemaSerializedMessage();

    return serializer.getUnserializer(malformedMessage)
      .should.be.rejected
      .then((response) => {
        expect(response).to.be.instanceof(Error);
        expect(response.name).to.be.equal(fixtures.errors.partialUnserializeSchema);
        return Promise.resolve();
      });
  });
});
