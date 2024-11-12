const express = require('express');
const StudentService = require('../services/studentsServices');
const { validateById, validateBody, validatePaginationParams } = require('../middleware/studentsMiddleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const students = await StudentService.findAll();
        res.json(students);
    } catch (error) {
        next(error);
    }
});

router.get('/paginated', validatePaginationParams, async (req, res) => {
    try {
        const { search = '', currentPage = 1, pageSize = 5 } = req.query;
        
        const result = await StudentService.getPaginated(
            search,
            currentPage,
            pageSize
        );

        res.json(result);
    } catch (error) {
        console.error('Error en ruta de paginación:', error);
        res.status(500).json({
            message: 'Error al obtener estudiantes',
            error: error.message
        });
    }
});

router.post('/', validateBody, async (req, res, next) => {
    try {
        const newStudent = await StudentService.create(req.body);
        res.status(201).json(newStudent);
    } catch (error) {
        next(error);
    }
});

module.exports = router;