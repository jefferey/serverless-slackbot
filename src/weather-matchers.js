'use strict';

const WeatherMatcher = {};
WeatherMatcher.satelliteMatcher = function(triggerWord, input) {
    const regex = new RegExp(`${triggerWord}\\s*:?\\s*(?:show)?\\s*satellite\\s*(?:image)?\\s*(?:for)?\\s*(Morgantown)\\s*(?:,)?\\s*(WV)\\s*$`);
    const matches = regex.exec(input);
    if (matches === null) {
        return null;
    }

    return {
        city: matches[1],
        state: matches[2]
    };
};

module.exports = WeatherMatcher;
