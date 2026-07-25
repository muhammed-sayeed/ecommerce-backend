import prisma from "../../../configs/prisma.config.js";

const findById = async (id) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  });
};

const findByName = async (name) => {
  return prisma.category.findFirst({
    where: {
      name,
      deletedAt: null,
    },
  });
};

const findBySlug = async (slug) => {
  return prisma.category.findFirst({
    where: {
      slug,
      deletedAt: null,
    },
  });
};

const create = async (data) => {
  return prisma.category.create({
    data,
  });
};

const update = async (id, data) => {
  return prisma.category.update({
    where: {
      id,
    },
    data,
  });
};

const softDelete = async (id) => {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
};

const findAll = async () => {
  return prisma.category.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });
};

export default {
  findById,
  findByName,
  findBySlug,
  create,
  update,
  softDelete,
  findAll,
};
