import authRepository from "../repositories/auth.repository.js";

const logout = async (userId) => {
  await authRepository.updateRefreshToken(userId, null);

  return {
    success: true,
  };
};

export default {
  logout,
};