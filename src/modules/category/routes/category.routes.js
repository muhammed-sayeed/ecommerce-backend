import express from "express";

import categoryController from "../controllers/category.controller.js";
import categoryValidation from "../validations/category.validation.js";

import authMiddleware from "../../../middlewares/auth.middleware.js";
import authorize from "../../../middlewares/authorize.middleware.js";
import validate from "../../../middlewares/validate.middleware.js";

import { UserRole } from "@prisma/client";

const router = express.Router();

router.get("/", categoryController.getAllCategories);

router.get(
  "/:id",
  validate(categoryValidation.getCategorySchema),
  categoryController.getCategoryById,
);

router.post(
  "/",
  authMiddleware,
  authorize(UserRole.ADMIN),
  validate(categoryValidation.createCategorySchema),
  categoryController.createCategory,
);

router.patch(
  "/:id",
  authMiddleware,
  authorize(UserRole.ADMIN),
  validate(categoryValidation.updateCategorySchema),
  categoryController.updateCategory,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize(UserRole.ADMIN),
  validate(categoryValidation.getCategorySchema),
  categoryController.deleteCategory,
);

export default router;
