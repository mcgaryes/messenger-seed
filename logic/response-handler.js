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
                
                log.debug(`Handling response with '${response.action}' action...`);
                resolve(actions[response.action](response.entities));
                
            } else if (response.type === 'msg') {
                
                if (response.quickreplies) {
                    
                    resolve(new QuickReplyMessage(response).message);
                    
                } else if (response.msg) {
                    
                    resolve(new TextMessage(response).message);
                    
                }
                
            } else {
                
                reject('Unknown wit response type.');
                
            }
            
        });
    }
}

module.exports = ResponseHandler;