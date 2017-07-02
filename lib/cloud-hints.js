'use strict';

const _ = require('lodash');
const async = require('async');
const fs = require('fs');

module.exports = {

    get_hints: function(cb) {
        const providers = fs.readdirSync(`${__dirname}/providers`);
        let cloud_hints;

        return async.some(providers, (provider_name, fn) => {
            const provider = require(`${__dirname}/providers/${provider_name}`);

            return provider.is_true((err, is_true, attrs) => {
                if (is_true) {
                    cloud_hints = attrs;
                    return fn(null, true);
                }

                return fn(null, false);
            });
        }, (err) => {
            return cb(err, cloud_hints);
        });
    }

}
