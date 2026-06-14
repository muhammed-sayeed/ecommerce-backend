import { createClient } from 'redis';

import appConfig from './app.config.js';

import logger from '../utils/logger.js';

const redisClient = createClient({
    socket: {
        host: appConfig.redis.host,
        port: appConfig.redis.port,
    },

    username:
        appConfig.redis.username || undefined,

    password:
        appConfig.redis.password || undefined,
});

redisClient.on('connect', () => {
    logger.info('Redis connecting...');
});

redisClient.on('ready', () => {
    logger.info('Redis connected successfully');
});

redisClient.on('error', (error) => {
    logger.error({
        message: 'Redis connection error',
        error: error.message,
    });
});

redisClient.on('end', () => {
    logger.warn('Redis connection closed');
});

export default redisClient;