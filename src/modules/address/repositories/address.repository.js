import prisma from "../../../configs/prisma.config.js";
import ADDRESS_SELECT from "../constants/address.select.js";

const countByUserId = async (userId) => {
  return prisma.address.count({
    where: {
      userId,
    },
  });
};

const clearDefaultByUserId = async (userId, tx = prisma) => {
  return tx.address.updateMany({
    where: {
      userId,
      isDefault: true,
    },
    data: {
      isDefault: false,
    },
  });
};

const create = async (data, tx = prisma) => {
  return tx.address.create({
    data,
    select: ADDRESS_SELECT,
  });
};

const findAllByUserId = async (userId) => {
  return prisma.address.findMany({
    where: {
      userId,
    },
    orderBy: [
      {
        isDefault: "desc",
      },
      {
        createdAt: "desc",
      },
    ],
    select: ADDRESS_SELECT,
  });
};

const findById = async (userId, addressId) => {
  return prisma.address.findFirst({
    where: {
      id: addressId,
      userId,
    },
    select: ADDRESS_SELECT,
  });
};

const update = async (id, data) => {
  return prisma.address.update({
    where: {
      id,
    },
    data,
    select: ADDRESS_SELECT,
  });
};

const setDefault = async (id, tx = prisma) => {
  return tx.address.update({
    where: {
      id,
    },
    data: {
      isDefault: true,
    },
    select: ADDRESS_SELECT,
  });
};

const remove = async (id, tx = prisma) => {
  return tx.address.delete({
    where: {
      id,
    },
  });
};

const findFirstByUserId = async (userId, tx = prisma) => {
  return tx.address.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
    select: ADDRESS_SELECT,
  });
};

export default {
  countByUserId,
  clearDefaultByUserId,
  create,
  findAllByUserId,
  findById,
  update,
  setDefault,
  remove,
  findFirstByUserId,
};
