import HTTP_STATUS from "../../../constants/httpStatus.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import sendResponse from "../../../utils/sendResponse.js";
import otpService from "../services/otp.service.js";
import registrationService from "../services/registration.service.js";
import tokenService from "../services/token.service.js";
import logoutService from "../services/logout.service.js";

const sendOtp = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  const result = await otpService.sendOtp(mobile);

  return sendResponse(res, {
    statusCode: HTTP_STATUS.OK,
    success: true,
    message: result.message,
    data: null,
  });
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  const result = await otpService.verifyRegistrationOtp(mobile, otp);

  return sendResponse(res, {
    statusCode: HTTP_STATUS.OK,

    success: true,

    message: "Authentication successful",

    data: result,
  });
});

const completeRegistration = asyncHandler(async (req, res) => {
  const result = await registrationService.completeRegistration(req.body);

  return sendResponse(res, {
    statusCode: HTTP_STATUS.CREATED,

    success: true,

    message: "Registration completed successfully",

    data: result,
  });
});

const sendLoginOtp = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  const result = await otpService.sendLoginOtp(mobile);

  return sendResponse(res, {
    statusCode: HTTP_STATUS.OK,

    success: true,

    message: result.message,

    data: null,
  });
});

const verifyLoginOtp = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  const result = await otpService.verifyLoginOtp(mobile, otp);

  return sendResponse(res, {
    statusCode: HTTP_STATUS.OK,

    success: true,

    message: "Login successful",

    data: result,
  });
});

const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const result = await tokenService.refreshToken(refreshToken);

  return sendResponse(res, {
    statusCode: HTTP_STATUS.OK,

    success: true,

    message: "Token refreshed successfully",

    data: result,
  });
});

const logout = asyncHandler(async (req, res) => {
  await logoutService.logout(req.user.id);

  return sendResponse(res, {
    statusCode: HTTP_STATUS.OK,

    success: true,
    message: "Logout successful",
    data: null,

  });
});

export default {
  sendOtp,
  verifyOtp,
  completeRegistration,
  sendLoginOtp,
  verifyLoginOtp,
  refreshToken,
  logout
};
