import jwt from 'jsonwebtoken';

import appConfig from '../../../configs/app.config.js';

const generateRefreshToken = (payload) => {

    const token = jwt.sign(
        payload,
        appConfig.jwt.refreshSecret,
        {
            expiresIn:
                appConfig.jwt.refreshExpiresIn,
        }
    );

    return token;

};

export default generateRefreshToken;