'use strict';
const mockery = require('mockery');
const sinon = require('sinon');

var SILENCE_BUNYAN = true;
if (process.env.SILENCE_BUNYAN) {
  var value = process.env.SILENCE_BUNYAN.toLowerCase().trim();
  const VALID_VALUES = ['false', 'true'];

  if (VALID_VALUES.indexOf(value) === -1) {
    console.error('Must specify either "false" or "true" if setting SILENCE_BUNYAN.');
    process.exit(1);
  }

  SILENCE_BUNYAN = Boolean(VALID_VALUES.indexOf(value));
}

before(() => {
  // Mock all instances of bunyan to silence all logs during test
  const mockLogger = {
    debug: sinon.stub(),
    info: sinon.stub(),
    error: sinon.stub()
  };
  const mockBunyan = {
    createLogger: sinon.stub().returns(mockLogger)
  }

  if (SILENCE_BUNYAN) {
    mockery.enable({
        warnOnUnregistered: false,
        useCleanCache: true
    });
    mockery.registerMock('bunyan', mockBunyan);
  }
});

after(() => {
  if (SILENCE_BUNYAN) {
    mockery.deregisterMock('bunyan');
    mockery.disable();
  }
});
