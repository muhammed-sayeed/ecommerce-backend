import HTTP_STATUS from "../constants/httpStatus.js";

const sendResponse = (
  res,
  {
    statusCode = HTTP_STATUS.OK,
    success = true,
    message = "Success",
    data = null,
  },
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

export default sendResponse;
