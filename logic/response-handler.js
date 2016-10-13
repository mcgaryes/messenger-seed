'use strict';

const QuickReplyMessage = require('../models/quickreply-message');
const TextMessage = require('../models/text-message');
const actions = require('../logic/actions');
const util = require('util');
const log = require('../utils/logger');

class ResponseHandler {
    
    static handle(response) {
        
        return new Promise((resolve, reject) => {
            
            log.info(util.inspect(response, {depth: 10}));
            
            log.debug(`Routing response with type '${response.type}'...`);
            
            if (response.type === 'action') {
                
                if (response.entities.intent[0].confidence > 0.8) {
                    log.debug(`Handling response with '${response.action}' action...`);
                    resolve(actions[response.action](response.entities));
                } else {
                    reject('action had too low of confidence');
                }
                
            } else if (response.type === 'msg') {
                
                if (response.quickreplies) {
                    
                    log.debug(`Handling response with type 'action'...`);
                    
                    resolve(new QuickReplyMessage(response).message);
                    
                } else if (response.msg) {
                    
                    resolve(new TextMessage(response).message);
                    
                }
                
            } else {
                
                reject('unknown wit response type');
                
            }
            
        });
    }
}

module.exports = ResponseHandler;