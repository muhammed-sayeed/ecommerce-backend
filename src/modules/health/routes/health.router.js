import express from 'express';

const router = express.Router();

import healthController from'../controllers/health.controller.js';
import validate from '../../../middlewares/validate.middleware.js';
import healthValidation from '../validations/health.validation.js';

router.get('/',
     validate(healthValidation.healthCheckSchema),
     healthController.checkHealth);

export default router;