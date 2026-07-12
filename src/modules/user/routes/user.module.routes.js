import express from "express";

import userController from "../controllers/user.controller.js";
import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";
import updateProfileSchema from "../validations/user.validation.js";

const router = express.Router();

router.get("/me", authMiddleware, userController.getProfile);
router.patch(
  "/me",
  authMiddleware,
  validate(updateProfileSchema),
  userController.updateProfile,
);

export default router;
