import addressService from "../services/address.service.js";
import sendResponse from "../../../utils/sendResponse.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

  const createAddress = async (req, res, next) => {
    try {
      const address = await addressService.createAddress(req.user.id, req.body);

      return sendResponse(res, {
        statusCode: HTTP_STATUS.CREATED,
        message: "Address created successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  const getAddresses = async (req, res, next) => {
    try {
      const addresses = await addressService.getAddresses(req.user.id);

      return sendResponse(res, {
        message: "Addresses fetched successfully",
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  };

  const getAddress = async (req, res, next) => {
    try {
      const address = await addressService.getAddress(
        req.user.id,
        req.validated.params.id
      );

      return sendResponse(res, {
        message: "Address fetched successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  const updateAddress = async (req, res, next) => {
    try {
      const address = await addressService.updateAddress(
        req.user.id,
        req.validated.params.id,
        req.body
      );

      return sendResponse(res, {
        message: "Address updated successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  const setDefaultAddress = async (req, res, next) => {
    try {
      const address = await addressService.setDefaultAddress(
        req.user.id,
        req.validated.params.id
      );

      return sendResponse(res, {
        message: "Default address updated successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  const deleteAddress = async (req, res, next) => {
    try {
      await addressService.deleteAddress(
        req.user.id,
        req.validated.params.id
      );

      return sendResponse(res, {
        message: "Address deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };


export default {
createAddress,
getAddresses,
getAddress,
updateAddress,
setDefaultAddress,
deleteAddress
};