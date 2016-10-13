'use strict';

const express = require('express');
const router = express.Router();
const uuid = require('node-uuid');

/**
 * Authorization route
 */
router.get('/authorize', function (req, res) {
    
    var accountLinkingToken = req.query.account_linking_token;
    var redirectURI = req.query.redirect_uri;
    
    // Authorization Code should be generated per user by the developer. This will be passed to the Account Linking callback.
    var authCode = uuid.v4();
    
    // Redirect users to this URI on successful login
    var redirectURISuccess = redirectURI + '&authorization_code=' + authCode;
    
    res.render('authorize', {
        accountLinkingToken: accountLinkingToken,
        redirectURI: redirectURI,
        redirectURISuccess: redirectURISuccess
    });
    
});

module.exports = router;