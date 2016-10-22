'use strict';

const request = require('request');
const config = require('config');
const log = require('../utils/logger');

/**
 * MessengerService
 */
class MessengerService {
    
    /**
     * Sends a message to facebook messenger.
     * @param recipientId
     * @param message
     * @return {Promise}
     */
    static sendMessageToRecipient(recipientId, message) {
        
        return new Promise((resolve, reject) => {
    
            
            
            log.debug(`Sending '${JSON.stringify(message)}' to facebook...`);
            
            request({
                uri: 'https://graph.facebook.com/v2.6/me/messages',
                qs: {access_token: config.get('fb').pageAccessToken},
                method: 'POST',
                json: {
                    recipient: {
                        id: recipientId
                    },
                    message: message
                }
            }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    resolve(body);
                } else {
                    if (error) {
                        reject(error);
                    } else {
                        reject(body.error);
                    }
                }
            });
            
        });
        
    }
    
}

module.exports = MessengerService;