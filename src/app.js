const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const env = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientOrigin }));
app.use(express.json({ limit: '1mb' }));
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
