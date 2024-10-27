const Student = require('../model/students');


const findAll = async () =>{
    try {
        const students= await Student.getAll(); 
        return students;
    } catch (error) {
        console.error('studentsServices: '+error);
        throw error;
    }
};

const create = async (student) =>{
    try {
        const newStudent = await Student.create({firstname: student.firstname})
        return newStudent;
    } catch (error) {
        console.error('studentsServices: '+error);
        throw error;
    }
}

module.exports ={
    findAll,
    create
};