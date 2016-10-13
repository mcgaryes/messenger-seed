'use strict';

// ============================================================
// === Packages ===============================================
// ============================================================

const request = require('request');
const config = require('config');

// ============================================================
// === Script =================================================
// ============================================================

const API_ENDPOINT = `https://graph.facebook.com/${config.get('fb').apiVersion}/me/thread_settings`;
const PAGE_ACCESS_TOKEN = config.get('fb').pageAccessToken;

// set get started messaging

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
    console.log(body);
});

// set persistent menu

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
                "title": "Help",
                "payload": "HELP"
            },
            {
                "type": "postback",
                "title": "Start Over",
                "payload": "START_OVER"
            }
        ]
    }
}, (err, resp, body) => {
    console.log(body);
});

// set greeting message

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
    console.log(body);
});