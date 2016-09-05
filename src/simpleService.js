const api = require('./weather-api');
const matchers = require('./weather-matchers');

const log = require('bunyan').createLogger({
    name: 'simpleService',
    streams: [
        {
            stream: process.stdout,
            level: 'debug'
        }
    ]
});

exports.handler = (event, context, callback) => {
    log.info('Checking input text', event.text);
    const satelliteMatcherResult = matchers.satelliteMatcher(event.trigger_word, event.text);
    if(satelliteMatcherResult) {
        api.getSatelliteImagery(
          satelliteMatcherResult.city, satelliteMatcherResult.state,
          (err, response) => {
              if (err) {
                  log.error('Error fetching satellite data', err);
                  return callback(null, {
                      text: 'Sorry, I can\'t help at the moment'
                  });
              }
              log.debug('Responding with satellite data', response);
              return callback(null, {
                  text: response.satelliteImageUrl
              });
        });
    }
}
