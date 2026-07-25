import categoryService from "../services/category.service.js";

import successResponse from "../../../utils/sendResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);

    return successResponse(
      res,
      category,
      "Category created successfully",
      HTTP_STATUS.CREATED,
    );
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    return successResponse(res, {
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.validated.params.id);

    return successResponse(res, category, "Category fetched successfully");
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.validated.params.id,
      req.body,
    );

    return successResponse(res, category, "Category updated successfully");
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.validated.params.id);

    return successResponse(res, null, "Category deleted successfully");
  } catch (error) {
    next(error);
  }
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
