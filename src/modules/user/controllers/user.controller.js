import userService from "../services/user.service.js";

class UserController {
  getProfile = async (req, res, next) => {
    try {
      const user = await userService.getProfile(req.user.id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserController();
