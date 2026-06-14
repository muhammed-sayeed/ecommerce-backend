import redisClient from "../../../configs/redis.config.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";
import AppError from "../../../utils/appError.js";
import authRepository from "../repositories/auth.repository.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import hashToken from "../utils/hashToken.js";
import otpKeys from "../utils/otpKeys.js";

const completeRegistration = async ({ mobile, firstName }) => {
  const registrationSession = await redisClient.get(
    otpKeys.registrationSession(mobile),
  );

  if (!registrationSession) {
    throw new AppError(
      "Registration session expired. Please verify OTP again.",
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  const existingUser = await authRepository.findUserByMobile(mobile);

  if (existingUser) {
    throw new AppError("User already exists.", HTTP_STATUS.CONFLICT);
  }

  const user = await authRepository.createUser({
    mobile,
    firstName,
    isMobileVerified: true,
  });

  const payload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  const hashedRefreshToken = hashToken(refreshToken);

  await authRepository.updateRefreshToken(user.id, hashedRefreshToken);

  await redisClient.del(otpKeys.registrationSession(mobile));

  return {
    user: {
      id: user.id,
      mobile: user.mobile,
      firstName: user.firstName,
      role: user.role,
    },

    accessToken,
    refreshToken,
  };
};

export default {
  completeRegistration,
};
