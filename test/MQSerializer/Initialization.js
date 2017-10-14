'use strict';

const { expect } = require('@itavy/test-utilities');
const { MQSerializer } = require('../../');

// eslint-disable-next-line require-jsdoc
const has = (obj, prop) => Object.hasOwnProperty.call(obj, prop);

describe('Initialization', () => {
  it('Should return a well formed object', (done) => {
    const testMessage = Reflect.construct(MQSerializer, []);

    expect(has(testMessage, 'sourceIdentifier')).to.be.equal(true);
    expect(has(testMessage, 'serializer')).to.be.equal(true);
    expect(has(testMessage, 'messagesVersion')).to.be.equal(true);
    expect(has(testMessage, 'reverseMessageVersion')).to.be.equal(true);

    done();
  });

  it('Should have all required methods', (done) => {
    const testMessage = Reflect.construct(MQSerializer, []);

    expect(testMessage).to.respondTo('serialize');
    expect(testMessage).to.respondTo('serializeSync');
    expect(testMessage).to.respondTo('unserialize');
    expect(testMessage).to.respondTo('getUnserializer');

    done();
  });
});
