const {Students} = require('../model/students');

const findAll = async () =>{
    try {
        const students= await Students.getAll(); 
        return students;
    } catch (error) {
        console.error('studentsServices: '+error);
        throw error;
    }
};

const findById = async (id) =>{
    try {
        const student = await Students.getById(id);
        return student;
    } catch (error) {
        console.error('studentsServices: '+error);
        throw error;
    }
}

const create = async (student) =>{
    try {
        const newStudent = await Students.create({firstname: student.firstname})
        return newStudent;
    } catch (error) {
        console.error('studentsServices: '+error);
        throw error;
    }
}

module.exports ={
    findAll,
    findById,
    create
};