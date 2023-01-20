const logger = require('winston');

function errorHandler(err, req, res, next) {
    if (process.env.NODE_ENV === 'development') {
        logger.error(err.message);
        return res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    }

    logger.error(err.message);
    return res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
}

module.exports = errorHandler;