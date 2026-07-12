import prisma from "../../../configs/prisma.config.js";

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
      select: {
        id: true,
        label: true,
        fullName: true,
        mobile: true,
        addressLine1: true,
        addressLine2: true,
        city: true,
        state: true,
        postalCode: true,
        country: true,
        landmark: true,
        addressType: true,
        isDefault: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export default new AddressRepository();
