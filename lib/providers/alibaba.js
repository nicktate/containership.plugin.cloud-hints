'use strict';

const _ = require('lodash');
const async = require('async');
const request = require('request');

module.exports = {

    is_true: function(fn) {
        return async.parallel({
            region: (fn) => {
                const options = {
                    url: 'http://100.100.100.200/latest/meta-data/region-id',
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

            availability_zone: (fn) => {
                const options = {
                    url: 'http://100.100.100.200/latest/meta-data/zone-id',
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

            instance_id: (fn) => {
                const options = {
                    url: 'http://100.100.100.200/latest/meta-data/instance-id',
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

            serial_number: (fn) => {
                const options = {
                    url: 'http://100.100.100.200/latest/meta-data/serial-number',
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

            metadata.provider = 'alibaba_cloud';
            return fn(err, true, metadata);
        });
    }

}
