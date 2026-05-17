import pinoHttp from 'pino-http';

import logger from '../utils/logger.js';

const httpLogger = pinoHttp({
    logger,

    customSuccessMessage: function (req, res) {
        return `${req.method} ${req.url} completed with ${res.statusCode}`;
    },

    customErrorMessage: function (req, res, error) {
        return `${req.method} ${req.url} failed with ${res.statusCode}`;
    },

    customLogLevel: function (req, res, error) {
        if (res.statusCode >= 500 || error) {
            return 'error';
        }

        if (res.statusCode >= 400) {
            return 'warn';
        }

        return 'info';
    },

    serializers: {
        req(req) {
            return {
                method: req.method,
                url: req.url,
            };
        },

        res(res) {
            return {
                statusCode: res.statusCode,
            };
        },
    },
});

export default httpLogger;