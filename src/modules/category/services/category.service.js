import slugify from "slugify";

import categoryRepository from "../repositories/category.repository.js";

import { AppError } from "../../../utils/appError.js";
import { HTTP_STATUS } from "../../../constants/httpStatus.js";

const createCategory = async (data) => {
  const normalizedName = data.name.trim();

  const existingCategory = await categoryRepository.findByName(normalizedName);

  if (existingCategory) {
    throw new AppError("Category already exists", HTTP_STATUS.CONFLICT);
  }

  const slug = slugify(normalizedName, {
    lower: true,
    strict: true,
    trim: true,
  });

  return categoryRepository.create({
    ...data,
    name: normalizedName,
    slug,
  });
};

const getAllCategories = async () => {
  return categoryRepository.findAll();
};

const getCategoryById = async (id) => {
  const category = await categoryRepository.findById(id);

  if (!category || category.deletedAt) {
    throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
  }

  return category;
};

const updateCategory = async (id, data) => {
  const category = await categoryRepository.findById(id);

  if (!category || category.deletedAt) {
    throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
  }

  const updateData = { ...data };

  if (data.name) {
    const normalizedName = data.name.trim();

    const existingCategory =
      await categoryRepository.findByName(normalizedName);

    if (existingCategory && existingCategory.id !== id) {
      throw new AppError("Category already exists", HTTP_STATUS.CONFLICT);
    }

    updateData.name = normalizedName;

    updateData.slug = slugify(normalizedName, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  return categoryRepository.update(id, updateData);
};

const deleteCategory = async (id) => {
  const category = await categoryRepository.findById(id);

  if (!category || category.deletedAt) {
    throw new AppError("Category not found", HTTP_STATUS.NOT_FOUND);
  }

  return categoryRepository.softDelete(id);
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
