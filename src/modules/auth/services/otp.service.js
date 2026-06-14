import redisClient from "../../../configs/redis.config.js";
import AppError from "../../../utils/appError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";
import OTP_CONFIG from "../constants/otp.constants.js";
import generateOtp from "../utils/generateOtp.js";
import hashOtp from "../utils/hashOtp.js";
import otpKeys from "../utils/otpKeys.js";
import logger from "../../../utils/logger.js";
import compareOtp from "../utils/compareOtp.js";
import authRepository from "../../auth/repositories/auth.repository.js";
import generateAccessToken from "../utils/generateAccessToken.js";
import generateRefreshToken from "../utils/generateRefreshToken.js";
import hashToken from "../utils/hashToken.js";
import validateOtp from "../utils/validateOtp.js";
import clearOtpSession from "../helpers/clearOtpSession.js";

const sendOtp = async (mobile) => {
  const cooldownKey = otpKeys.cooldown(mobile);

  const cooldownExists = await redisClient.exists(cooldownKey);

  if (cooldownExists) {
    throw new AppError(
      "Please wait before requesting another OTP",
      HTTP_STATUS.TOO_MANY_REQUESTS,
    );
  }

  const otp = generateOtp();

  const hashedOtp = hashOtp(otp);

  await redisClient.set(otpKeys.otp(mobile), hashedOtp, {
    EX: OTP_CONFIG.EXPIRY_SECONDS,
  });

  await redisClient.set(otpKeys.attempts(mobile), 0, {
    EX: OTP_CONFIG.EXPIRY_SECONDS,
  });

  await redisClient.set(cooldownKey, "1", {
    EX: OTP_CONFIG.RESEND_COOLDOWN_SECONDS,
  });

  //  Mock SMS Provider
  logger.info({
    mobile,
    otp,
    message: "OTP generated (mock provider)",
  });

  return {
    message: "OTP sent successfully",
  };
};

// const verifyOtp = async (mobile, otp) => {
//   const otpKey = otpKeys.otp(mobile);

//   const attemptsKey = otpKeys.attempts(mobile);

//   const storedOtpHash = await redisClient.get(otpKey);

//   if (!storedOtpHash) {
//     throw new AppError("OTP expired or invalid", HTTP_STATUS.BAD_REQUEST);
//   }

//   const isValidOtp = compareOtp(otp, storedOtpHash);

//   if (!isValidOtp) {
//     const attempts = Number(await redisClient.incr(attemptsKey));

//     if (attempts >= OTP_CONFIG.MAX_ATTEMPTS) {
//       await redisClient.del(otpKey, attemptsKey, otpKeys.cooldown(mobile));

//       throw new AppError(
//         "Maximum OTP attempts exceeded",
//         HTTP_STATUS.TOO_MANY_REQUESTS,
//       );
//     }

//     throw new AppError("Invalid OTP", HTTP_STATUS.BAD_REQUEST);
//   }

//   let user = await authRepository.findUserByMobile(mobile);

//   if (!user) {
//     user = await authRepository.createUser(mobile);
//   }

//   const payload = {
//     userId: user.id,
//     role: user.role,
//   };

//   const accessToken = generateAccessToken(payload);

//   const refreshToken = generateRefreshToken(payload);

//   const hashedRefreshToken = hashToken(refreshToken);

//   await authRepository.updateRefreshToken(user.id, hashedRefreshToken);

//   await redisClient.del(otpKey, attemptsKey, otpKeys.cooldown(mobile));

//   return {
//     isNewUser: !user.email,

//     user: {
//       id: user.id,
//       mobile: user.mobile,
//       email: user.email,
//       role: user.role,
//     },

//     accessToken,
//     refreshToken,
//   };
// };

const verifyRegistrationOtp = async (mobile, otp) => {
  const existingUser = await authRepository.findUserByMobile(mobile);

  if (existingUser) {
    throw new AppError(
      "User already exists. Please login.",
      HTTP_STATUS.CONFLICT,
    );
  }

  await validateOtp(mobile, otp);

  await redisClient.set(otpKeys.registrationSession(mobile), "verified", {
    EX: OTP_CONFIG.REGISTRATION_SESSION_EXPIRY_SECONDS,
  });

  await clearOtpSession(mobile);

  return {
    registrationVerified: true,
  };
};

const sendLoginOtp = async (mobile) => {
  const user = await authRepository.findUserByMobile(mobile);

  if (!user) {
    throw new AppError(
      "User not found. Please register.",
      HTTP_STATUS.NOT_FOUND,
    );
  }

  return sendOtp(mobile);
};

const verifyLoginOtp = async (mobile, otp) => {
  const user = await authRepository.findUserByMobile(mobile);

  if (!user) {
    throw new AppError("User not found.", HTTP_STATUS.NOT_FOUND);
  }

  await validateOtp(mobile, otp);

  const payload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = generateAccessToken(payload);

  const refreshToken = generateRefreshToken(payload);

  const hashedRefreshToken = hashToken(refreshToken);

  await authRepository.updateRefreshToken(user.id, hashedRefreshToken);

  await clearOtpSession(mobile);

  return {
    user: {
      id: user.id,
      mobile: user.mobile,
      firstName: user.firstName,
      email: user.email,
      role: user.role,
    },

    accessToken,
    refreshToken,
  };
};

export default {
  sendOtp,
  verifyRegistrationOtp,
  sendLoginOtp,
  verifyLoginOtp
};
