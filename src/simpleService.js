const api = require('./weather-api');
const matchers = require('./weather-matchers');

exports.handler = (event, context, callback) => {
    const satelliteMatcherResult = matchers.satelliteMatcher(event.trigger_word, event.text);
    if(satelliteMatcherResult) {
        api.getSatelliteImagery(
          satelliteMatcherResult.city, satelliteMatcherResult.state,
          (err, response) => {
              if (err) {
                  return callback(null, {
                      text: 'Sorry, I can\'t help at the moment'
                  });
              }
              return callback(null, {
                  text: response.satelliteImageUrl
              });
        });
    }
}
