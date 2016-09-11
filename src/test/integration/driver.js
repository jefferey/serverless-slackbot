const expect = require('chai').expect;

describe('The app', () => {
    it('should return weather data', (done) => {
        const chatbot = require('../simpleService');
        const message = {
            trigger_word: 'chatbot',
            text: 'chatbot: show satellite image for Morgantown, WV'
        };
        chatbot.handler(message, {}, (err, response) => {
            expect(response.text).to.include('http://wublast.wunderground.com');
            done();
        });
    });
});
