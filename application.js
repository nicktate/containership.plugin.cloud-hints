'use strict';

const cloud_hints = require('./cloud-hints');

const ContainershipPlugin = require('containership.plugin');

module.exports = new ContainershipPlugin({
    type: 'core',

    runLeader: function(core) {
        cloud_hints.get_hints(core);
    },

    runFollower(core) {
        cloud_hints.get_hints(core);
    },

    initialize: function(core){
        if(!core || !core.logger) {
            return console.warn('This plugin does not include any CLI support');
        }

        if(core.options.mode === 'leader') {
            return module.exports.runLeader(core);
        } else if (core.options.mode === 'follower') {
            return module.exports.runFollower(core);
        } else if (core.logger) {
            core.logger.register('cloud-hints-plugin');
            return core.loggers['cloud-hints-plugin'].log('error', 'Invalid configuration found when stopping containership cloud-hints plugin!');
        }
    },

    reload: function(){}
});
