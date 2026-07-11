import prisma from "../../../configs/prisma.config.js";

class UserRepository {
  async findById(id) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        mobile: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isMobileVerified: true,
        isEmailVerified: true,
        createdAt: true,
        isActive: true
      },
    });
  }

  async update(id, data) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }
}

export default new UserRepository();
