const {Op} = require('sequelize');
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
        const lastStudent =await Student.findOne({
            order:[['sid','DESC']],
            attributes: ['sid']
        });
        const newSid = lastStudent ? lastStudent.sid +1:1;

        const existingStudent = await Student.findOne({
            where: {
                [Op.or]:[
                    {dni: student.dni},
                    {email: student.email}
                ],
                deleted:0
            }
        });

        if (existingStudent) {
            throw new Error("Estudiante existente");
        }

        const newStudent = await Student.create({
            sid: newSid, 
            firstname: student.firstname,
            lastname: student.lastname,
            dni: student.dni,
            email: student.email,
            deleted:0
        });
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