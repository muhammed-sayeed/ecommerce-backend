import envConfig from './env.config.js';

const appConfig = {
    port: envConfig.PORT || 5000,
    env: envConfig.NODE_ENV,
};

export default appConfig;