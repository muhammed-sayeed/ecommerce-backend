import express from 'express';

import authModuleRoutes from '../../modules/auth/routes/auth.module.routes.js';

const router = express.Router();

router.use('/', authModuleRoutes);

export default router;