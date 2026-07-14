import addressService from "../services/address.service.js";

class addressController {
  createAddress = async (req, res, next) => {
    try {
      const address = await addressService.createAddress(req.user.id, req.body);

      res.status(201).json({
        success: true,
        message: "Address created successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  getAddresses = async (req, res, next) => {
    try {
      const addresses = await addressService.getAddresses(req.user.id);

      return res.status(200).json({
        success: true,
        data: addresses,
      });
    } catch (error) {
      next(error);
    }
  };

  getAddress = async (req, res, next) => {
    try {
      const address = await addressService.getAddress(
        req.user.id,
        req.validated.params.id,
      );

      return res.status(200).json({
        success: true,
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  updateAddress = async (req, res, next) => {
    try {
      const address = await addressService.updateAddress(
        req.user.id,
        req.validated.params.id,
        req.body,
      );

      return res.status(200).json({
        success: true,
        message: "Address updated successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  setDefaultAddress = async (req, res, next) => {
    try {
      const address = await addressService.setDefaultAddress(
        req.user.id,
        req.validated.params.id,
      );

      return res.status(200).json({
        success: true,
        message: "Default address updated successfully",
        data: address,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteAddress = async (req, res, next) => {
    try {
      await addressService.deleteAddress(req.user.id, req.validated.params.id);

      return res.status(200).json({
        success: true,
        message: "Address deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new addressController();
