"use strict";

const express = require('express');
const router = express.Router();
const config = require('config');
const {Wit} = require('node-wit');
const uuid = require('node-uuid');
const MessengerService = require('../services/messenger-service');
const ResponseHandler = require('../logic/response-handler');
const log = require('../utils/logger');

// wit.ai client
const client = new Wit({accessToken: config.get('wit').accessToken});

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
    
    if (data.object === 'page') {
        
        data.entry.forEach(function (pageEntry) {
            
            pageEntry.messaging.forEach(function (messagingEvent) {
                
                // convert message from messenger to wit formatted message
                
                let messageToWit;
                
                if (messagingEvent.message) {
                    
                    if (messagingEvent.message.quick_reply) {
                        messageToWit = messagingEvent.message.quick_reply.payload;
                    } else {
                        messageToWit = messagingEvent.message.text;
                    }
                    
                } else if (messagingEvent.postback) {
                    messageToWit = messagingEvent.postback.payload;
                }
                
                // handle message to wit
                
                if (messageToWit) {
                    log.debug(`Sending message '${messageToWit}' to wit...`);
                    client.converse(uuid.v1(), messageToWit).then(response => {
                        
                        ResponseHandler.handle(response).then(messageToMessenger => {
                            MessengerService.sendMessageToRecipient(messageToMessenger, messagingEvent.sender.id)
                                .catch(log.error);
                        }).catch(log.error);
                        
                    }).catch(log.error);
                } else {
                    log.warn('Not sending empty message to wit');
                }
                
            });
        });
        
        res.sendStatus(200);
    }
    
});

module.exports = router;