import dotenv from 'dotenv';

dotenv.config();

const envConfig = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV || 'development',
};

export default envConfig;