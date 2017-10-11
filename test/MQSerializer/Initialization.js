'use strict';

const { expect } = require('@itavy/test-utilities');
const { getSerializer } = require('../../lib/v6x');
const { MQSerializer } = require('../../lib/v6x/MQSerializer');

// eslint-disable-next-line require-jsdoc
const has = (obj, prop) => Object.hasOwnProperty.call(obj, prop);

describe('Initialization', () => {
  it('Should be instance of MQSerializer', (done) => {
    const testMessage = getSerializer();

    expect(testMessage).to.be.instanceof(MQSerializer);

    done();
  });

  it('Should return a well formed object', (done) => {
    const testMessage = getSerializer();

    expect(has(testMessage, 'debug')).to.be.equal(true);
    expect(has(testMessage, 'sourceIdentifier')).to.be.equal(true);
    expect(has(testMessage, 'errorBuilder')).to.be.equal(true);
    expect(has(testMessage, 'serializer')).to.be.equal(true);
    expect(has(testMessage, 'messagesVersion')).to.be.equal(true);
    expect(has(testMessage, 'reverseMessageVersion')).to.be.equal(true);

    done();
  });

  it('Should have all required methods', (done) => {
    const testMessage = getSerializer();

    expect(testMessage).to.respondTo('serialize');
    expect(testMessage).to.respondTo('unserialize');
    expect(testMessage).to.respondTo('getUnserializer');

    done();
  });
});
