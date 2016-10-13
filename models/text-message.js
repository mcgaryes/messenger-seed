'use strict';

const log = require('../utils/logger');

/**
 * Simple text based message
 */
class TextMessage {
    
    /**
     * Creates a properly formatted text message formatted for messenger.
     * @param resposne
     */
    constructor(resposne) {
        this.message = {text: resposne.msg};
    }
    
}

module.exports = TextMessage;