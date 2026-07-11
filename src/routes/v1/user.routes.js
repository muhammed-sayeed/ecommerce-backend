import express from "express";

import userModuleRoutes from "../../modules/user/routes/user.module.routes.js";

const router = express.Router();

router.use("/", userModuleRoutes);

export default router;
