import otpKeys from "./otpKeys.js";
import redisClient from "../../../configs/redis.config.js";
import compareOtp from "./compareOtp.js";
import OTP_CONFIG from "../constants/otp.constants.js";
import AppError from "../../../utils/appError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

const validateOtp = async (mobile, otp) => {
  const otpKey = otpKeys.otp(mobile);

  const attemptsKey = otpKeys.attempts(mobile);

  const cooldownKey = otpKeys.cooldown(mobile);

  const storedOtpHash = await redisClient.get(otpKey);

  if (!storedOtpHash) {
    throw new AppError("OTP expired or invalid", HTTP_STATUS.BAD_REQUEST);
  }

  const isValidOtp = compareOtp(otp, storedOtpHash);

  if (!isValidOtp) {
    const attempts = await redisClient.incr(attemptsKey);

    if (Number(attempts) >= OTP_CONFIG.MAX_ATTEMPTS) {
      await redisClient.del(otpKey, attemptsKey, cooldownKey);

      throw new AppError(
        "Maximum OTP attempts exceeded. Please request a new OTP.",
        HTTP_STATUS.TOO_MANY_REQUESTS,
      );
    }

    throw new AppError(
      `Invalid OTP. ${
        OTP_CONFIG.MAX_ATTEMPTS - Number(attempts)
      } attempts remaining.`,
      HTTP_STATUS.BAD_REQUEST,
    );
  }

  return true;
};
export default validateOtp;