import express from "express";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";
import addressValidation from "../validations/address.validation.js";
import addressController from "../controllers/address.controller.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  validate(addressValidation.createAddressSchema),
  addressController.createAddress,
);
export default router;