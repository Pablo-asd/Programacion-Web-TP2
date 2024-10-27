const express = require('express');

const {findAll,create,findById} = require('../services/studentsServices');
const {validateById,validateBody} = require('../middleware/studentsMiddleware');

const router = express.Router();

router.get('/',async(req,res)=>{
    try {
        const students = await findAll();
        res.json(students);
    } catch (error) {
        res.sendStatus(500);
    }
});

router.get('/:id',validateById, async(req,res) =>{
    try {
        const student = await findById(Number(req.params.id));

        if(!student){
            res.status(404).json({
                message: 'Student not found'
            });
            return;
        }
    } catch (error) {
        res.sendStatus(500);
    }
})

router.post('/',validateBody,async(req,res) =>{
    try {
        const newStudent = await create (req.body);
        res.json(newStudent);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;
