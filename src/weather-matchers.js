'use strict';

const WeatherMatcher = {};
WeatherMatcher.satelliteMatcher = function(triggerWord, input) {
    const regex = new RegExp(`${triggerWord}\\s*:?\\s*(?:show)?\\s*(satellite|now|current)\\s*(?:image)?\\s*(?:for)?\\s*([a-zA-Z\\s]*)\\s*(?:,)?\\s*([a-zA-Z]{2})\\s*$`);
    const matches = regex.exec(input);
    if (matches === null) {
        return null;
    }

    return {
        op: matches[1].trim(),
        city: matches[2].trim(),
        state: matches[3].trim()
    };
};

module.exports = WeatherMatcher;
