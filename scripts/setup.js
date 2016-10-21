'use strict';

// ============================================================
// === Packages ===============================================
// ============================================================

const request = require('request');
const config = require('config');
const log = require('../utils/logger');

// ============================================================
// === Script =================================================
// ============================================================

const API_ENDPOINT = `https://graph.facebook.com/${config.get('fb').apiVersion}/me/thread_settings`;
const PAGE_ACCESS_TOKEN = config.get('fb').pageAccessToken;

function setGetStartedMessaging() {
    
    log.info(`Setting 'Get Started' messaging...`);
    
    return new Promise((resolve, reject) => {
        
        request.post({
            url: API_ENDPOINT,
            qs: {
                access_token: PAGE_ACCESS_TOKEN
            },
            form: {
                "setting_type": "call_to_actions",
                "thread_state": "new_thread",
                "call_to_actions": [
                    {
                        "payload": "GET_STARTED"
                    }
                ]
            }
        }, (err, resp, body) => {
            if (err) {
                reject(err);
            } else {
                log.info(`'Get Started' messaging set.`);
                resolve();
            }
        });
        
    });
    
}

function setPersistentMenu() {
    
    log.info(`Setting 'Persistent Menu' options...`);
    
    
    return new Promise((resolve, reject) => {
        request.post({
            url: API_ENDPOINT,
            qs: {
                access_token: PAGE_ACCESS_TOKEN
            },
            form: {
                "setting_type": "call_to_actions",
                "thread_state": "existing_thread",
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Say Hello",
                        "payload": "SAY_HELLO"
                    }
                ]
            }
        }, (err, resp, body) => {
            if (err) {
                reject(err);
            } else {
                log.info(`'Persistent Menu' options set.`);
    
                resolve();
            }
        });
    });
}

function setGreetingMessage() {
    
    log.info(`Setting 'Greeting' message...`);
    
    
    return new Promise((resolve, reject) => {
        
        request.post({
            url: API_ENDPOINT,
            qs: {
                access_token: PAGE_ACCESS_TOKEN
            },
            form: {
                "setting_type": "greeting",
                "greeting": {
                    "text": "Welcome {{user_first_name}}. Press the \"Get Started\" button at the bottom of the screen to start a conversation!"
                }
            }
        }, (err, resp, body) => {
            if (err) {
                reject(err);
            } else {
                log.info(`'Greeting' message set...`);
    
                resolve();
            }
        });
    });
}

setGetStartedMessaging()
    .then(setPersistentMenu)
    .then(setGreetingMessage)
    .catch(log.error);