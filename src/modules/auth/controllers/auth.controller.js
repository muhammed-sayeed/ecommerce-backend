import HTTP_STATUS from "../../../constants/httpStatus.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import sendResponse from "../../../utils/sendResponse.js";
import otpService from "../services/otp.service.js";

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

  const result = await otpService.verifyOtp(mobile, otp);

  return sendResponse(res, {
    statusCode: HTTP_STATUS.OK,

    success: true,

    message: "Authentication successful",

    data: result,
  });
});

export default {
  sendOtp,
  verifyOtp
};
