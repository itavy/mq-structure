'use strict';

const { expect } = require('@itavy/test-utilities');
const { MQSerializer } = require('../../');
const fixtures = require('./Fixtures');

describe('Functionality', () => {
  it('Should decode with success what has been encoded', () => {
    const serializer = Reflect.construct(MQSerializer, []);

    return serializer.serialize(fixtures.testMessage)
      .then(response => serializer.unserialize(response))
      .should.be.fulfilled
      .then((message) => {
        expect(message).to.be.eql(fixtures.testMessage.toJSON());
        return Promise.resolve();
      });
  });
});
