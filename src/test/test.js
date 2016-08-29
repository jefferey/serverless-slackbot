var expect = require('chai').expect;
var mockery = require('mockery');
var should = require('chai').should();
var sinon = require('sinon');

describe('The chatbot', function() {
  before(function () {
    mockery.enable({
      warnOnUnregistered: false
    });
    mockery.registerMock('aws-sdk', {
      Lambda: function() {
        return {
          getFunction: function() {
            return {
              promise: function () {
                return {
                  then: function (handler) {
                    handler({
                      Configuration: {
                        Runtime: 'nodejs4.3'
                      }
                    });

                    return {
                      catch: function () {}
                    };
                  }
                }
              }
            };
          }
        };
      },
      Service: {
        _serviceMap: ""
      }
    });
  });
  after(function () {
    mockery.deregisterMock('aws-sdk');
    mockery.disable();
  });

  it('should return help information', function (done) {
    var bot = require('../simpleService.js');
    var incomingMessage = {
      trigger_word: 'testbot',
      text:'testbot help'
    };
    bot.handler(incomingMessage, {}, function(err, response) {
      expect(err).to.be.null;
      expect(response).to.exist;
      expect(response.text).to.exist;
      response.text.should.be.a('string');
      response.text.should.contain('Available commands');
      done();
    });
  });
});
