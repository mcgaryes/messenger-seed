"use strict";

const express = require('express');
const router = express.Router();
const config = require('config');
const util = require('util');
const MessengerService = require('../services/messenger-service');
const WitService = require('../services/wit-service');
const ResponseHandler = require('../logic/response-handler');
const log = require('../utils/logger');

/**
 * validation webhook for messenger
 */
router.get('/webhook', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.get('fb').validationToken) {
        log.info("Validating webhook");
        res.status('200').send(req.query['hub.challenge']);
    } else {
        log.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

/**
 * Chatbot communication from messenger
 */
router.post('/webhook', (req, res) => {
    
    let data = req.body;
    
    log.debug(util.inspect(data, {depth: 10}));
    
    if (data.object === 'page') {
        
        data.entry.forEach(function (pageEntry) {
            
            pageEntry.messaging.forEach(function (messagingEvent) {
                
                if (messagingEvent.message) {
                    
                    if (messagingEvent.message.quick_reply) {
                        
                        log.debug(`Handling quick reply...`);
                        
                        WitService.send(messagingEvent.message.quick_reply.payload)
                            .then(ResponseHandler.handle)
                            .then(MessengerService.sendMessageToRecipient.bind(null, messagingEvent.sender.id))
                            .catch(log.error);
                        
                    } else {
                        
                        log.debug(`Handling text message...`);
                        
                        WitService.send(messagingEvent.message.text)
                            .then(ResponseHandler.handle)
                            .then(MessengerService.sendMessageToRecipient.bind(null, messagingEvent.sender.id))
                            .catch(log.error);
                        
                    }
                    
                } else if (messagingEvent.postback) {
                    
                    log.debug('Handling postback...');
                    
                    WitService.send(messagingEvent.postback.payload)
                        .then(ResponseHandler.handle)
                        .then(MessengerService.sendMessageToRecipient.bind(null, messagingEvent.sender.id))
                        .catch(log.error);
                    
                } else if (messagingEvent.optin) {
                    
                    log.debug('Handling optin...');
                    MessengerService.sendMessageToRecipient(messagingEvent.sender.id, {text: "Authentication successful"});
                    
                }
                
            });
        });
        
        res.sendStatus(200);
        
    }
    
});


module.exports = router;