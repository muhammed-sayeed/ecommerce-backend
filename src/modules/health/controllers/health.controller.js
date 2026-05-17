import healthService from'../services/health.service.js';
import asyncHandler from '../../../utils/asyncHandler.js';
import sendResponse from '../../../utils/sendResponse.js';

const checkHealth = asyncHandler(async(req, res) => {

    const response = healthService.getHealthStatus();
        return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Health check successful',
        data: response,
    });
})

export default {
    checkHealth
};