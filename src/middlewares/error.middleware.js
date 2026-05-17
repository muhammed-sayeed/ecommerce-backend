import logger from '../utils/logger.js';

const globalErrorHandler = (
    err,
    req,
    res,
    next
) => {

    err.statusCode = err.statusCode || 500;

    err.status = err.status || 'error';

    logger.error({
        message: err.message,
        stack: err.stack,
    });

    return res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message:
            err.message || 'Internal Server Error',
    });

};

export default globalErrorHandler;