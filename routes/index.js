"use strict";

const express = require('express');
const router = express.Router();
const config = require('config');

/**
 * Renders a helper page for connecting to facebook messenger
 */
router.get('/', function (req, res) {
    
    res.render('index', {
        appId: config.get('fb').appId,
        pageId: config.get('fb').pageId
    });
    
});

module.exports = router;