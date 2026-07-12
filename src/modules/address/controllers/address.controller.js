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
}


export default new addressController();