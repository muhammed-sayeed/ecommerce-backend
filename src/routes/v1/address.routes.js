import express from "express";

import addressModuleRoutes from '../../modules/address/routes/address.module.routes.js';

const router = express.Router();

router.use("/",addressModuleRoutes);

export default router;