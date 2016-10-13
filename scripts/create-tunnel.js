'use strict';

// ============================================================
// === Packages ===============================================
// ============================================================

const config = require('config');
const request = require('request');
const ngrok = require('ngrok');
const exec = require('child_process').exec;
const log = require('../utils/logger');
const fbConfig = config.get('fb');

// ============================================================
// === Script =================================================
// ============================================================

const API_ENDPOINT = `https://graph.facebook.com/${fbConfig.apiVersion}/${fbConfig.appId}/subscriptions`;

ngrok.connect({
    proto: "http",
    addr: '5000'
}, function (err, url) {
    
    log.debug(`Opening 'ngrok' proxy: ${url}...`);
    exec(`open ${url}`);
    
    // update facebook
    request.post({
        url: API_ENDPOINT,
        qs: {
            access_token: fbConfig.appAccessToken
        },
        form: {
            object: 'page',
            verify_token: 'verify_token',
            callback_url: `${url}/webhook`
        }
    }, (err, resp, body) => {
        if (err) {
            log.error(err);
            process.exit(1);
        }
    });
    
});

