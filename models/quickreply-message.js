'use strict';

const util = require('util');
const log = require('../utils/logger');

/**
 * Version of message that returns a set of options for the user.
 */
class QuickReplyMessage {
    
    /**
     * Creates and assigns message
     * @constructor
     * @param response
     */
    constructor(response) {
        
        let message = {
            text: response.msg,
            quick_replies: []
        };
        
        response.quickreplies.forEach(quickReply => {
            
            message.quick_replies.push({
                "content_type": "text",
                "title": quickReply,
                "payload": quickReply.toUpperCase().replace(/\s/gi, '_')
            });
            
        });
        
        this.message = message;
        
    }
    
}

module.exports = QuickReplyMessage;