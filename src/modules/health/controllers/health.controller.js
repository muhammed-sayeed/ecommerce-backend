import healthService from'../services/health.service.js';
import asyncHandler from '../../../utils/asyncHandler.js';

const checkHealth = asyncHandler(async(req, res) => {

    const response = healthService.getHealthStatus();
    return res.status(200).json(response);
})

export default {
    checkHealth
};