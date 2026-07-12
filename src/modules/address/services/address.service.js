import prisma from "../../../configs/prisma.config.js";
import addressRepository from "../repositories/address.repository.js";

class AddressService {
  async createAddress(userId, data) {
    const addressCount = await addressRepository.countByUserId(userId);

    let isDefault = data.isDefault ?? false;

    if (addressCount === 0) {
      isDefault = true;
    }

    return prisma.$transaction(async (tx) => {
      if (isDefault) {
        await addressRepository.clearDefaultByUserId(userId, tx);
      }

      return addressRepository.create(
        {
          ...data,
          userId,
          isDefault,
        },
        tx,
      );
    });
  }
}

export default new AddressService();