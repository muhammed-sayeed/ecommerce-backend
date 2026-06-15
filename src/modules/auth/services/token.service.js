import appConfig from "../../../configs/app.config.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";
import AppError from "../../../utils/appError.js";
import authRepository from "../repositories/auth.repository.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import hashToken from "../utils/hashToken.js";
import verifyToken from "../utils/verifyToken.js";

const refreshToken = async (refreshTokenValue) => {

  const decoded = verifyToken(refreshTokenValue, appConfig.jwt.refreshSecret);

  const user = await authRepository.findUserById(decoded.userId);

  if (!user) {
    throw new AppError("User not found", HTTP_STATUS.UNAUTHORIZED);
  }

  if (!user.isActive) {
    throw new AppError("Account suspended", HTTP_STATUS.FORBIDDEN);
  }

  const hashedIncomingToken = hashToken(refreshTokenValue);

  if (hashedIncomingToken !== user.refreshToken) {
    throw new AppError("Invalid refresh token", HTTP_STATUS.UNAUTHORIZED);
  }

  const payload = {
    userId: user.id,
    role: user.role,
  };

  const newAccessToken = generateAccessToken(payload);

  const newRefreshToken = generateRefreshToken(payload);

  const hashedRefreshToken = hashToken(newRefreshToken);

  await authRepository.updateRefreshToken(user.id, hashedRefreshToken);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
  };
};

export default {
    refreshToken
};