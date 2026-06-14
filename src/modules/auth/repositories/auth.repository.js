import prisma from "../../../configs/prisma.config.js";

const findUserByMobile = async (mobile) => {
  return prisma.user.findUnique({
    where: { mobile },
  });
};

const createUser = async (data) => {
  return prisma.user.create({
      data
  });
};

const updateRefreshToken = async (userId, refreshToken) => {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      refreshToken,
    },
  });
};
export default {
    createUser,
    findUserByMobile,
    updateRefreshToken
}