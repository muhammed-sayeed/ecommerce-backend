import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "../utils/appError.js";

const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        throw new AppError(
          "Authentication required",
          HTTP_STATUS.UNAUTHORIZED
        );
      }

      if (!allowedRoles.includes(req.user.role)) {
        throw new AppError(
          "Forbidden: insufficient permissions",
          HTTP_STATUS.FORBIDDEN
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authorize;