'use strict';

const testUtilities = require('@itavy/test-utilities');
const getSerializer = require('../../lib/v6x').getSerializer;
const MQMessage = require('../../lib/v6x').MQMessage;

const expect = testUtilities.getExpect();

describe('Serializer', () => {
  let sandbox;

  beforeEach((done) => {
    sandbox = testUtilities.getSinonSandbox();
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });


  it('Should return a buffer', () => {
    const serializer = getSerializer();
    const mapSpy = sandbox.spy(serializer.messagesVersion, 'get');

    return serializer.serialize(Reflect.construct(MQMessage, [{}]))
      .should.be.fulfilled
      .then((response) => {
        expect(mapSpy.callCount).to.be.equal(1);
        expect(mapSpy.getCall(0).args).to.be.eql(['1']);
        expect(response).to.be.instanceof(Buffer);
        return Promise.resolve();
      });
  });
});
