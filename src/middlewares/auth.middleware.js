import appConfig from "../configs/app.config.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "../utils/appError.js";
import authRepository from "../modules/auth/repositories/auth.repository.js";
import userRepository from "../modules/user/repositories/user.repository.js";
import verifyToken from "../modules/auth/utils/verifyToken.js";


const authMiddleware = async (req, res, next) => {
  try {

    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new AppError(
        "Authorization token missing",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    const token = authorization.startsWith("Bearer ")
      ? authorization.split(" ")[1]
      : null;

    if (!token) {
      throw new AppError(
        "Invalid authorization format",
        HTTP_STATUS.UNAUTHORIZED,
      );
    }

    const decoded = verifyToken(token, appConfig.jwt.accessSecret);

    const user = await userRepository.findById(decoded.userId);

    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.UNAUTHORIZED);
    }
    if (!user.isActive) {
      throw new AppError("Account is suspended", HTTP_STATUS.FORBIDDEN);
    }

    req.user = {
      id: user.id,
      mobile: user.mobile,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;