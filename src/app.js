const express = require('express');

const healthRoutes = require('./modules/health/routes/health.router');

const app = express();

app.use(express.json());

app.use('/api/v1/health', healthRoutes);

module.exports = app;