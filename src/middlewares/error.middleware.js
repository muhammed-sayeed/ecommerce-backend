const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    return res.status(err.statusCode).json({
        success: false,
        status: err.statusCode,
        message: err.message || 'Internal Server Error',
    });
};

export default globalErrorHandler;