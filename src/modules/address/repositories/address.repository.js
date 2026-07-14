import prisma from "../../../configs/prisma.config.js";
import ADDRESS_SELECT from "../constants/address.select.js";

class AddressRepository {
  async countByUserId(userId) {
    return prisma.address.count({
      where: {
        userId,
      },
    });
  }

  async clearDefaultByUserId(userId, tx = prisma) {
    return tx.address.updateMany({
      where: {
        userId,
        isDefault: true,
      },
      data: {
        isDefault: false,
      },
    });
  }

  async create(data, tx = prisma) {
    return tx.address.create({
      data,
      select: ADDRESS_SELECT,
    });
  }

  async findAllByUserId(userId) {
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
  }

  async findById(userId, addressId) {
    return prisma.address.findFirst({
      where: {
        id: addressId,
        userId,
      },
      select: ADDRESS_SELECT,
    });
  }

  async update(id, data) {
    return prisma.address.update({
      where: {
        id,
      },
      data,
      select: ADDRESS_SELECT,
    });
  }

  async setDefault(id, tx = prisma) {
    return tx.address.update({
      where: {
        id,
      },
      data: {
        isDefault: true,
      },
      select: ADDRESS_SELECT,
    });
  }

  async delete(id, tx = prisma) {
    return tx.address.delete({
      where: {
        id,
      },
    });
  }

  async findFirstByUserId(userId, tx = prisma) {
    return tx.address.findFirst({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: ADDRESS_SELECT,
    });
  }
}

export default new AddressRepository();
