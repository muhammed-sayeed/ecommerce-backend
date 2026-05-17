import express from 'express';

import healthRoutes from'./modules/health/routes/health.router.js';
import globalErrorHandler from './middlewares/error.middleware.js';
import notFound from './middlewares/notFound.middleware.js';

const app = express();

app.use(express.json());

app.use('/api/v1/health', healthRoutes);

app.use(notFound);
app.use(globalErrorHandler);

export default app;