import dotenv from 'dotenv';

import appConfig from './configs/app.config.js';

dotenv.config();

import app from './app.js';

const PORT = appConfig.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});