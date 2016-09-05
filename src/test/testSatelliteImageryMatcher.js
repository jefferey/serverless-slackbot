'use strict';

const expect = require('chai').expect;
const should = require('chai').should();

const weatherMatchers = require('../weather-matchers');

const trigger_word = 'testbot';
const regex = new RegExp(`${trigger_word}\\s*:?\\s*(?:show)?\\s*satellite\\s*(?:image)?\\s*(?:for)?\\s*(Morgantown)\\s*(?:,)?\\s*(WV)\\s*$`);

function testInputForCityStateMatch(input, city, state) {
    expect(weatherMatchers.satelliteMatcher(trigger_word, input)).not.to.be.null;
    weatherMatchers.satelliteMatcher(trigger_word, input).city.should.equal(city);
    weatherMatchers.satelliteMatcher(trigger_word, input).state.should.equal(state);
};

describe('Regex tests', () => {
    it('can properly match a city state combo', () => {
        testInputForCityStateMatch(
            'testbot satellite image for Morgantown, WV', 'Morgantown', 'WV'
        );
        testInputForCityStateMatch(
            'testbot: show satellite image for Morgantown, WV', 'Morgantown', 'WV'
        );
        testInputForCityStateMatch(
            'testbot show satellite image for Morgantown, WV', 'Morgantown', 'WV'
        );
        testInputForCityStateMatch(
            'testbot satellite Morgantown, WV', 'Morgantown', 'WV'
        );
        testInputForCityStateMatch(
            'testbot satellite for Morgantown, WV', 'Morgantown', 'WV'
        );
        testInputForCityStateMatch(
            'testbot satellite for Morgantown WV', 'Morgantown', 'WV'
        );
    });

    it('should return null when there is not match', function () {
        expect(weatherMatchers.satelliteMatcher('Bogus string')).to.be.null;
        expect(weatherMatchers.satelliteMatcher('testbot satellite for Morgantown')).to.be.null;
        expect(weatherMatchers.satelliteMatcher('testbot satellite WV'));
    });

    it('should match another test city', () => {
        testInputForCityStateMatch(
            'testbot satellite for Dayton, OH', 'Dayton', 'OH'
        );
    });
});
