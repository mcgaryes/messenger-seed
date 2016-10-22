"use strict";

const express = require('express');
const router = express.Router();
const config = require('config');
const {Wit} = require('node-wit');
const uuid = require('node-uuid');
const MessengerService = require('../services/messenger-service');
const ResponseHandler = require('../logic/response-handler');
const log = require('../utils/logger');
const util = require('util');

function sendMessageToWit(message, sender) {
    
    log.debug(`Sending message '${message}' to wit...`);
    
    client.converse(uuid.v1(), message).then(response => {
        
        ResponseHandler.handle(response).then(messageToMessenger => {
            MessengerService.sendMessageToRecipient(messageToMessenger, sender)
                .catch(log.error);
        }).catch(log.error);
        
    }).catch(log.error);
    
}

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
    
    log.debug(util.inspect(data, {depth: 10}));
    
    if (data.object === 'page') {
        
        data.entry.forEach(function (pageEntry) {
            
            pageEntry.messaging.forEach(function (messagingEvent) {
                
                if (messagingEvent.message) {
                    if (messagingEvent.message.quick_reply) {
                        sendMessageToWit(messagingEvent.message.quick_reply.payload, messagingEvent.sender.id);
                    } else {
                        sendMessageToWit(messagingEvent.message.text, messagingEvent.sender.id);
                    }
                } else if (messagingEvent.postback) {
                    sendMessageToWit(messagingEvent.postback.payload, messagingEvent.sender.id);
                } else if (messagingEvent.optin) {
                    MessengerService.sendMessageToRecipient({text: "Authentication successful"}, messagingEvent.sender.id);
                }
                
            });
        });
        
        res.sendStatus(200);
    }
    
});


module.exports = router;