const express = require('express');
const StudentService = require('../services/studentsServices');
const { validateById, validateBody, validateUrlQuery } = require('../middleware/studentsMiddleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const students = await StudentService.findAll();
        res.json(students);
    } catch (error) {
        next(error);
    }
});

router.get('/paginated', validateUrlQuery, async (req, res, next) => {
    try {
        const students = await StudentService.getAll(
            req.query.search,
            req.query.currentPage,
            req.query.pageSize
        );
        res.json(students);
    } catch (error) {
        next(error);
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