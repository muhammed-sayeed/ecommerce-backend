const healthService = require('../services/health.service');

const checkHealth = (req, res) => {
    const response = healthService.getHealthStatus();

    return res.status(200).json(response);
};

module.exports = {
    checkHealth,
};