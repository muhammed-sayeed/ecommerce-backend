import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import healthRoutes from'./modules/health/routes/health.router.js';
import globalErrorHandler from './middlewares/error.middleware.js';
import notFound from './middlewares/notFound.middleware.js';
import httpLogger from './middlewares/httpLogger.middleware.js';
import authRoutes from './modules/auth/routes/auth.module.routes.js';
import securityConfig from './configs/security.config.js';
import globalLimiter from './middlewares/rateLimit/globalLimit.js';

const app = express();

app.use(helmet(
    securityConfig.helmet
));

app.use(
    cors({
        origin:'*'
    })
);

app.use(globalLimiter);

app.use(httpLogger);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;