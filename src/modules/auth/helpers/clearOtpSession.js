import redisClient from "../../../configs/redis.config.js";
import otpKeys from "../utils/otpKeys.js";

const clearOtpSession = async (
  mobile
) => {

  await redisClient.del(
    otpKeys.otp(mobile),
    otpKeys.attempts(mobile),
    otpKeys.cooldown(mobile)
  );

};

export default clearOtpSession;