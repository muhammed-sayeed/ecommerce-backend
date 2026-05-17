import jwt from 'jsonwebtoken';

import appConfig from '../../../configs/app.config.js';

const generateAccessToken = (payload) => {

    const token = jwt.sign(
        payload,
        appConfig.jwt.accessSecret,
        {
            expiresIn:
                appConfig.jwt.accessExpiresIn,
        }
    );

    return token;

};

export default generateAccessToken;