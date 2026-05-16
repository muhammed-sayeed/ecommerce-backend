const getHealthStatus = () => {
    return {
        success: true,
        message: 'Server is healthy',
    };
};

module.exports = {
    getHealthStatus,
};