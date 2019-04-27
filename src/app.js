const express = require('express');
const router = require('./routes');
const middleware = require('./middlewares');

const app = express();

middleware(app);
router(app);

module.exports = app;
