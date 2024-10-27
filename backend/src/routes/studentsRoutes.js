const express = require('express');

const {findAll,create} = require('../services/studentsServices');
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


router.post('/',validateBody,async(req,res) =>{
    try {
        const newStudent = await create (req.body);
        res.json(newStudent);
    } catch (error) {
        res.sendStatus(500);
    }
});

module.exports = router;
