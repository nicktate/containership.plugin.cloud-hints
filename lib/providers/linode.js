'use strict';

const os = require('os');

module.exports = {

    is_true: function(fn) {
        if(os.release().indexOf('linode') === -1) {
            return fn(null, false);
        }

        return fn(null, true, { provider: 'linode' });
    }

}
