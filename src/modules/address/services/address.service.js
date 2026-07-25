import prisma from "../../../configs/prisma.config.js";
import AppError from "../../../utils/appError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";
import addressRepository from "../repositories/address.repository.js";

const getOwnedAddress = async (userId, addressId) => {
  const address = await addressRepository.findById(userId, addressId);

  if (!address) {
    throw new AppError("Address not found", HTTP_STATUS.NOT_FOUND);
  }

  return address;
};

const createAddress = async (userId, data) => {
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
      tx
    );
  });
};

const getAddresses = async (userId) => {
  return addressRepository.findAllByUserId(userId);
};

const getAddress = async (userId, addressId) => {
  return getOwnedAddress(userId, addressId);
};

const updateAddress = async (userId, addressId, data) => {
  await getOwnedAddress(userId, addressId);

  return addressRepository.update(addressId, data);
};

const setDefaultAddress = async (userId, addressId) => {
  const address = await getOwnedAddress(userId, addressId);

  if (address.isDefault) {
    return address;
  }

  return prisma.$transaction(async (tx) => {
    await addressRepository.clearDefaultByUserId(userId, tx);

    return addressRepository.setDefault(addressId, tx);
  });
};

const deleteAddress = async (userId, addressId) => {
  const address = await getOwnedAddress(userId, addressId);

  if (!address.isDefault) {
    await addressRepository.remove(addressId);

    return;
  }

  await prisma.$transaction(async (tx) => {
    await addressRepository.remove(addressId, tx);

    const nextAddress = await addressRepository.findFirstByUserId(userId, tx);

    if (nextAddress) {
      await addressRepository.setDefault(nextAddress.id, tx);
    }
  });
};

export default {
  getOwnedAddress,
  createAddress,
  getAddresses,
  getAddress,
  updateAddress,
  setDefaultAddress,
  deleteAddress,
};