const express = require('express');
const cors = require('cors');
const healthRoutes = require('./routes/health.routes');
const notFound = require('./middlewares/not-found.middleware');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/health', healthRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;