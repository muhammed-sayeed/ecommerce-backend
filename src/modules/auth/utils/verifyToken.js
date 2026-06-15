import jwt from "jsonwebtoken";
import AppError from "../../../utils/appError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch {
    throw new AppError("Invalid or expired token", HTTP_STATUS.UNAUTHORIZED);
  }
};

export default verifyToken;
