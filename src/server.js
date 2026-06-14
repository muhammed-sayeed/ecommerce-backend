import dotenv from 'dotenv';

import appConfig from './configs/app.config.js';
import logger from './utils/logger.js';

dotenv.config();

import app from './app.js';
import redisClient from './configs/redis.config.js';

const PORT = appConfig.port;

const startServer = async () => {

    try {

        await redisClient.connect();

        app.listen(PORT, () => {

            logger.info(
                `Server running on port ${PORT}`
            );

        });

    } catch (error) {

        logger.error({
            message: 'Server startup failed',
            error: error.message,
        });

        process.exit(1);

    }

};

startServer();