import bcrypt from 'bcrypt';

import appConfig from '../../../configs/app.config.js';

const hashPassword = async (password) => {

    const hashedPassword = await bcrypt.hash(
        password,
        appConfig.bcrypt.saltRounds
    );

    return hashedPassword;

};

export default hashPassword;