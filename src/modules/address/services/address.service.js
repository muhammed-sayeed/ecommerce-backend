import prisma from "../../../configs/prisma.config.js";
import AppError from "../../../utils/appError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";
import addressRepository from "../repositories/address.repository.js";

class AddressService {
  async getOwnedAddress(userId, addressId) {
    const address = await addressRepository.findById(userId, addressId);

    if (!address) {
      throw new AppError("Address not found", HTTP_STATUS.NOT_FOUND);
    }

    return address;
  }

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

  async getAddresses(userId) {
    return await addressRepository.findAllByUserId(userId);
  }

  async getAddress(userId, addressId) {
    const address = await this.getOwnedAddress(userId, addressId);

    return address;
  }

  async updateAddress(userId, addressId, data) {
    const address = await this.getOwnedAddress(userId, addressId);

    return addressRepository.update(addressId, data);
  }

  async setDefaultAddress(userId, addressId) {
    const address = await athis.getOwnedAddress(userId, addressId);

    if (address.isDefault) {
      return address;
    }

    return prisma.$transaction(async (tx) => {
      await addressRepository.clearDefaultByUserId(userId, tx);

      return addressRepository.setDefault(addressId, tx);
    });
  }

  async deleteAddress(userId, addressId) {
    const address = await this.getOwnedAddress(userId, addressId);

    if (!address.isDefault) {
      await addressRepository.delete(addressId);

      return;
    }

    await prisma.$transaction(async (tx) => {
      await addressRepository.delete(addressId, tx);

      const nextAddress = await addressRepository.findFirstByUserId(userId, tx);

      if (nextAddress) {
        await addressRepository.setDefault(nextAddress.id, tx);
      }
    });
  }
}

export default new AddressService();
