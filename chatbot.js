'use strict';

const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const https = require('https');
const morgan = require('morgan');
const config = require('config');
const webhook = require('./routes/webhook');
const authorize = require('./routes/authorize');
const index = require('./routes/index');
const log = require('./utils/logger');

/**
 * Verifies the request signature sent from facebook
 * @param req
 * @param res
 * @param buf
 */
function verifyRequestSignature(req, res, buf) {
    
    let signature = req.headers["x-hub-signature"];
    
    if (signature) {
        
        let elements = signature.split('=');
        let method = elements[0];
        let signatureHash = elements[1];
        
        let expectedHash = crypto.createHmac('sha1', config.get('fb').appSecret).update(buf).digest('hex');
        
        if (signatureHash != expectedHash) {
            throw new Error("Couldn't validate the request signature.");
        }
        
    } else {
        
        log.error("Couldn't validate the signature.");
        
    }
}

// create, configure and start the chatbot app

var app = express();

app.set('port', process.env.PORT || '5000');
app.set('view engine', 'ejs');
app.use(morgan('combined'));
app.use(bodyParser.json({verify: verifyRequestSignature}));
app.use(express.static('public'));
app.use('/', [index, webhook, authorize]);

app.listen(app.get('port'));