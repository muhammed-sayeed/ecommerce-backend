import pinoHttp from 'pino-http';

import logger from '../utils/logger.js';

const httpLogger = pinoHttp({
    logger,

    customSuccessMessage(req, res) {
        return `${req.method} ${req.url} completed with ${res.statusCode}`;
    },

    customLogLevel(req, res, error) {

        if (res.statusCode >= 500 || error) {
            return 'silent';
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