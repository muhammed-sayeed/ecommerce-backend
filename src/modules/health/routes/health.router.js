import express from 'express';

const router = express.Router();

import healthController from'../controllers/health.controller.js';

router.get('/', healthController.checkHealth);

export default router;