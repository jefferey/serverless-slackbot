const request = require('request');
const BASE_URL = 'https://api.wunderground.com/api/API_KEY';

var Api = {};
Api.getSatelliteImagery = (city, state, callback) => {
    const satelliteImageUrl = `${BASE_URL}/satellite/q/${state}/${city}.json`;
    request({
        method: 'GET',
        uri: satelliteImageUrl,
        json: true
    }, (err, response, body) => {
        if (err) {
            return callback(err);
        }

        return callback(null, {
            satelliteImageUrl: body.satellite.image_url
        });
    });
};

module.exports = Api;
