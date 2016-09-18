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
        switch(satelliteMatcherResult.op.toLowerCase()) {
            case "satellite":
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
                    }
                );
                break;
            case "now":
            case "current":
                api.getCurrentConditons(
                    satelliteMatcherResult.city, satelliteMatcherResult.state,
                    (err, response) => {
                        if (err) {
                            log.error('Error fetching current conditions', err);
                            return callback(null, {
                                text: 'Sorry, I can\'t help at the moment'
                            });
                        }
                        log.debug('Responding with current conditions', response);
                        return callback(null, {
                            text: response.conditions
                        });
                    }
                );
                break;
            case "today":
                break;
        }
    } else {
        return callback(null, {
            text: 'I don\'t know what to say to that.'
        });
    }
}
