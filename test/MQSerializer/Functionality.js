'use strict';

const { expect } = require('@itavy/test-utilities');
const serializationLib = require('../../lib/v6x');
const fixtures = require('./Fixtures');

describe('Functionality', () => {
  it('Should decode with success what has been encoded', () => {
    const serializer = serializationLib.getSerializer();

    return serializer.serialize(fixtures.testMessage)
      .then(response => serializer.unserialize(response))
      .should.be.fulfilled
      .then((message) => {
        expect(message).to.be.eql(fixtures.testMessage);
        return Promise.resolve();
      });
  });
});
