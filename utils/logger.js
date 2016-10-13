'use strict';

const tracer = require('tracer')

/**
 * Application wide logging
 */
class Logger {
    
    /**
     * Creates and instance of a logger with the proper formatting.
     * @constructor
     */
    constructor() {
        
        let config = {
            format: "{{timestamp}} <{{title}}> ({{file}}:{{line}}) {{message}} ",
            dateformat: "HH:MM:ss.L"
        };
        
        this.instance = tracer.colorConsole(config);
        
    }
    
}

module.exports = new Logger().instance;