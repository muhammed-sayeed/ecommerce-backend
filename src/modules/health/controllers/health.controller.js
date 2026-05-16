import healthService from'../services/health.service.js';

const checkHealth = (req, res) => {
    const response = healthService.getHealthStatus();

    return res.status(200).json(response);
};

export default {
    checkHealth
};