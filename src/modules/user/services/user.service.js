import userRepository from "../repositories/user.repository.js";
import appError from "../../../utils/appError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

class UserService {
  async getProfile(userId) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    return user;
  }
}

export default new UserService();
