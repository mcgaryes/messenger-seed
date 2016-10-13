'use strict';

const log = require('../utils/logger');

/**
 * Actions to be performed from wit.ai callbacks
 */
class Actions {
    
    /**
     * Simple hello world example
     * @param entities
     * @return {{text: string}}
     */
    static sayHello(entities) {
        return {text: `Hello!`};
    }
    
}

module.exports = Actions;