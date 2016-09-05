var expect = require('chai').expect;
var mockery = require('mockery');
var should = require('chai').should();
var sinon = require('sinon');

const stub = sinon.stub();
describe('The chatbot', function() {
    before(() => {
        mockery.enable({
            warnOnUnregistered: false,
            useCleanCache: true
        });
        mockery.registerMock('request', stub);
    });
    after(() => {
        mockery.deregisterMock('request');
        mockery.disable();
    });
    it('should return satellite imagery for Morgantown, WV', (done) => {
        stub.yields(null, null, {
            response: {},
            satellite: {
                image_url: 'http://bogus.image.com'
            }
        });

        const chatbot = require('../simpleService.js');
        const message = {
            trigger_word: 'chatbot',
            text: 'chatbot: show satellite image for Morgantown, WV'
        };
        chatbot.handler(message, {}, (err, response) => {
            expect(response.text).to.include('http://bogus.image.com');
            done();
        });
    });
});
