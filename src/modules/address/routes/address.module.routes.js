import express from "express";
import { UserRole } from "@prisma/client";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import authorize from "../../../middlewares/authorize.middleware.js";
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

router.get("/", authMiddleware, addressController.getAddresses);

router.get(
  "/:id",
  authMiddleware,
  validate(addressValidation.getAddressSchema),
  addressController.getAddress,
);

router.patch(
  "/:id",
  authMiddleware,
  validate(addressValidation.updateAddressSchema),
  addressController.updateAddress,
);

router.patch(
  "/:id/default",
  authMiddleware,
  validate(addressValidation.setDefaultAddressSchema),
  addressController.setDefaultAddress,
);

router.delete(
  "/:id",
  authMiddleware,
  validate(addressValidation.setDefaultAddressSchema),
  addressController.deleteAddress,
);
export default router;
