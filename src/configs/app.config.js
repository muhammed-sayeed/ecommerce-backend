import envConfig from './env.config.js';

const appConfig = {
    port: envConfig.PORT || 5000,
    bcrypt: {
    saltRounds:
        Number(envConfig.BCRYPT_SALT_ROUNDS) || 10,
    },
    jwt: {
    accessSecret:
        envConfig.ACCESS_TOKEN_SECRET,

    accessExpiresIn:
        envConfig.ACCESS_TOKEN_EXPIRES_IN,

    refreshSecret:
        envConfig.REFRESH_TOKEN_SECRET,

    refreshExpiresIn:
        envConfig.REFRESH_TOKEN_EXPIRES_IN,
    },
    env: envConfig.NODE_ENV
};

export default appConfig;