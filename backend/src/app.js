const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const qs = require('querystring');
require('./config/setupModel');

const studentsRoutes = require('./routes/studentsRoutes');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('query parser', str => {
    return qs.parse(str)
});
// Rutas
app.use('/api/students', studentsRoutes);

module.exports = app;