const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const qs = require('querystring');
require('./config/setupModel');

const studentsRoutes = require('./routes/studentsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Query parser personalizado
app.set('query parser', str => qs.parse(str));

// Rutas
app.use('/api/students', studentsRoutes);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

module.exports = app;