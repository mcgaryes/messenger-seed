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
        
        if (entities.hello && entities.hello[0].confidence > 0.9) {
            return {text: `Hello!`};
        } else {
            log.debug(`Low confidence of ${entities.hello[0].confidence}`);
        }
        
        return Actions.unknownHandler(entities);
        
    }
    
    static unknownHandler(entities) {
        return {text: `I dont understand the statement.`};
    }
    
}

module.exports = Actions;