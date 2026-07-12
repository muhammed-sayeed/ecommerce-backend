import express from "express";

import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import addressRoutes from './address.routes.js';
 
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/address', addressRoutes);

export default router;