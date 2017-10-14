'use strict';

const { expect, getSinonSandbox } = require('@itavy/test-utilities');
const { MQMessageV1, MQMessage, MQSerializer } = require('../../');

describe('FromSync', () => {
  const sandbox = getSinonSandbox();
  const serializedMessage = new MQMessageV1().toPB();

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('should throw an error for unknown version', (done) => {
    try {
      MQMessage.fromSync({}, '999999');
    } catch (error) {
      expect(error).to.be.instanceof(Error);
      expect(error).to.have.property('name', 'MQ_STRUCTURE_UNKNOWN_MESSAGE_VERSION');
      done();
    }
  });

  it('Should call getPBSerializer', (done) => {
    const spy = sandbox.spy(MQMessage, 'getPBSerializer');
    try {
      MQMessage.fromSync({}, '999999');
    } catch (_) {
      expect(spy.callCount).to.be.equal(1);
      done();
    }
  });

  it('Should return an instance of MQMessageV1', (done) => {
    const m = MQMessage.fromSync({}, MQMessageV1);
    expect(m).to.be.instanceof(MQMessageV1);
    done();
  });

  it('Default message version is MQMessageV1', (done) => {
    const m = MQMessage.fromSync({});
    expect(m).to.be.instanceof(MQMessageV1);
    done();
  });

  it('Should call unserializer with expected parameters', (done) => {
    const spy = sandbox.spy(MQSerializer.prototype, 'unserializeSync');
    MQMessage.fromSync(serializedMessage);
    expect(spy.callCount).to.be.equal(1);
    expect(spy.getCall(0).args).to.be.eql([serializedMessage]);
    done();
  });

  it('Should return an instance of MQMessageV1', (done) => {
    const m = MQMessage.fromSync(serializedMessage);
    expect(m).to.be.instanceof(MQMessageV1);
    done();
  });

  it('Should throw for unknown version', (done) => {
    sandbox.stub(MQSerializer.prototype, 'unserializeSync').returns({
      message: Buffer.from('message'),
      version: '9999999',
    });
    try {
      MQMessage.fromSync(serializedMessage);
    } catch (error) {
      expect(error).to.be.instanceof(Error);
      expect(error).to.have.property('name', 'MQ_STRUCTURE_UNKNOWN_MESSAGE_VERSION');
      done();
    }
  });
});
