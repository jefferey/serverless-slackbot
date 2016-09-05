'use strict';

const expect = require('chai').expect;
const mockery = require('mockery');
const sinon = require('sinon');

var api = null;
const stub = sinon.stub();
describe('Weather API integration', () => {
    before(() => {
        mockery.enable({
            warnOnUnregistered: false
        });
        mockery.registerMock('request', stub);
        api = require('../weather-api.js')
    });
    after(function () {
        mockery.deregisterMock('request');
        mockery.disable();
    });

    it('should propogate an error', (done) => {
        stub.yields(new Error('Boom'));

        api.getSatelliteImagery('BogusCity', 'BogusState', (err, response) => {
            expect(err).not.to.be.null;
            done();
        });
    });

    it('should return a URL when searching satellite imagery', (done) => {
        stub.yields(null, null, {
            response:  {

            },
            satellite: {
                image_url: 'http://bogus.weathersite.com/satelliteimg.jpg'
            }
        });

        api.getSatelliteImagery('Morgantown', 'WV', (err, response) => {
            expect(err).to.be.null;
            expect(response.satelliteImageUrl).to.contain('http://bogus.weathersite.com');
            done();
        });
    });
});
