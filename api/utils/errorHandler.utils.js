// For Error Handling

// Logger
const logger = require('../../config/logs/logger');


// Error Handler
const errorHandler = (err, req, res, next) => {
    logger.error(err);
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        }
    });
};


// exporting errorHandler
module.exports = errorHandler;