import express from "express";

import authController from "../controllers/auth.controller.js";
import validate from "../../../middlewares/validate.middleware.js";
import authValidation from "../validations/auth.validation.js";

const router = express.Router();

router.post(
  "/mobile/send-otp",
  validate(authValidation.sendOtpSchema),
  authController.sendOtp,
);
router.post(
  "/mobile/verify-otp",
  validate(authValidation.verifyOtpSchema),
  authController.verifyOtp,
);
export default router;
