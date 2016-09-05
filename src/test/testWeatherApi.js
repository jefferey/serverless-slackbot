'use strict';

const expect = require('chai').expect;
const should = require('chai').should();
const mockery = require('mockery');
const sinon = require('sinon');

describe('Weather API integration', () => {
    before(()  => {
        mockery.enable();
        mockery.registerMock('request', (options, callback) => {
            return callback(null, {}, {satellite: {image_url: 'farts'}});
        });
    });
    after(() => {
        mockery.disable();
    });

    it('should return a URL when searching satellite imagery', (done) => {
        const api = require('../weather-api.js');
        api.getSatelliteImagery('Morgantown', 'WV', (err, response) => {
            expect(err).to.be.null;
            expect(response.satelliteImageUrl).to.contain('http://bogus.weathersite.com');
            done();
        });
    });
});
