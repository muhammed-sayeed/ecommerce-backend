import express from "express";

import authController from "../controllers/auth.controller.js";
import validate from "../../../middlewares/validate.middleware.js";
import authValidation from "../validations/auth.validation.js";
import registrationValidation from "../validations/registration.validation.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authLimiter from "../../../middlewares/rateLimit/authLimit.js";

const router = express.Router();

router.post(
  "/mobile/send-otp",
  authLimiter,
  validate(authValidation.sendOtpSchema),
  authController.sendOtp,
);
router.post(
  "/register/verify-otp",
  authLimiter,
  validate(authValidation.verifyOtpSchema),
  authController.verifyOtp,
);
router.post(
  "/register/complete",
  authLimiter,
  validate(registrationValidation.completeRegistrationSchema),
  authController.completeRegistration,
);
router.post(
  "/login/send-otp",
  authLimiter,
  validate(authValidation.sendOtpSchema),
  authController.sendLoginOtp,
);
router.post(
  "/login/verify-otp",
  authLimiter,
  validate(authValidation.verifyOtpSchema),
  authController.verifyLoginOtp,
);
router.post(
  "/refresh-token",
  validate(authValidation.refreshTokenSchema),
  authController.refreshToken
)
router.post(
  "/logout",
  authMiddleware,
  authController.logout
)

export default router;
