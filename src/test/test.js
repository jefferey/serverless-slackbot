var expect = require('chai').expect;
var mockery = require('mockery');
var should = require('chai').should();
var sinon = require('sinon');

var chatbot = null;
const stub = sinon.stub();
describe('The chatbot', function() {
    before(() => {
        mockery.enable({
            warnOnUnregistered: false,
            useCleanCache: true
        });
        mockery.registerMock('request', stub);
        chatbot = require('../simpleService.js');
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

        const message = {
            trigger_word: 'chatbot',
            text: 'chatbot: show satellite image for Morgantown, WV'
        };
        chatbot.handler(message, {}, (err, response) => {
            expect(response.text).to.include('http://bogus.image.com');
            done();
        });
    });
    it('should return error text on error', () => {
        stub.yields(new Error('Boom'));

        const message = {
            trigger_word: 'chatbot',
            text: 'chatbot: show satellite image for Morgantown, WV'
        };
        chatbot.handler(message, {}, (err, response) => {
            expect(response.text).to.include('Sorry');
        });
    });
});
