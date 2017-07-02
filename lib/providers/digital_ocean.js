'use strict'

const _ = require('lodash');
const async = require('async');
const request = require('request');

module.exports = {

    is_true: function(fn) {
        return async.parallel({
            droplet_id: (fn) => {
                const options = {
                    url: 'http://169.254.169.254/metadata/v1/id',
                    method: 'GET',
                    timeout: 5000
                }

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode != 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            },

            region: (fn) => {
                const options = {
                    url: 'http://169.254.169.254/metadata/v1/region',
                    method: 'GET',
                    timeout: 5000
                }

                return request(options, (err, response, body) => {
                    if(err) {
                        return fn(err);
                    }

                    if(response.statusCode != 200) {
                        return fn(new Error(['Request returned status code:', response.statusCode].join(' ')));
                    }

                    return fn(null, body);
                });
            }
        }, (err, metadata) => {
            if (err) {
                return fn(err, false);
            }

            metadata.provider = 'digital_ocean';
            return fn(err, true, metadata);
        });
    }

}
