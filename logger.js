const winston = require('winston');

// Logger configuration
const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};

// Create the logger
module.exports = winston.createLogger(logConfiguration);