import dotenv from 'dotenv';

import appConfig from './configs/app.config.js';
import logger from './utils/logger.js';

dotenv.config();

import app from './app.js';

const PORT = appConfig.port;

app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});