const log = require('bunyan').createLogger({
    name: 'weather-api'
});

const request = require('request');
const BASE_URL = 'https://api.wunderground.com/api';

var Api = {};
Api.getSatelliteImagery = (city, state, callback) => {
    const satelliteImageUrl = `${BASE_URL}/${Api.key}/satellite/q/${state}/${city}.json`;
    request({
        method: 'GET',
        uri: satelliteImageUrl,
        json: true
    }, (err, response, body) => {
        if (err) {
            return callback(err);
        }

        if (body.response.error) {
          const error = body.response.error;
          const errMsg = error.type + ':' + error.description;
          log.error('Error fetching satellite image', errMsg);
          return callback(new Error(errMsg));
        }

        return callback(null, {
            satelliteImageUrl: body.satellite.image_url
        });
    });
};

module.exports = Api;
