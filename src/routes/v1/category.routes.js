import express from "express";

import categoryModuleRoutes from '../../modules/category/routes/category.routes.js';

const router = express.Router();

router.use("/",categoryModuleRoutes);

export default router;