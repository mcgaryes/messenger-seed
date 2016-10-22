'use strict';

const config = require('config');
const log = require('../utils/logger');
const {Wit} = require('node-wit');
const client = new Wit({accessToken: config.get('wit').accessToken});
const uuid = require('node-uuid');

/**
 * WitService
 */
class WitService {
    
    /**
     * Sends message to Wit
     * @param message
     * @return {Promise}
     */
    static send(message) {
        
        return new Promise((resolve, reject) => {
    
            log.debug(`Sending message '${message}' to wit...`);
    
            client.converse(uuid.v1(), message).then(resolve).catch(reject);
            
        });
        
    }
    
}

module.exports = WitService;