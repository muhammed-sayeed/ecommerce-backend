import AppError from "../../../utils/appError.js";

const getHealthStatus = () => {
    return {
        success: true,
        message: 'Server is healthy',
    };
};

export default {
    getHealthStatus
};