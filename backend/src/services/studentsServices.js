const Student = require('../model/students');

class StudentService {
    static async findAll() {
        try {
            return await Student.getAll();
        } catch (error) {
            console.error('Error en findAll:', error);
            throw new Error('Error al obtener estudiantes');
        }
    }

    static async create(studentData) {
        try {
            const lastSid = await Student.getLastSID();
            const newSid = lastSid + 1;

            const existingStudent = await Student.findByDniOrEmail(
                studentData.dni,
                studentData.email
            );

            if (existingStudent) {
                throw new Error('Ya existe un estudiante con ese DNI o email');
            }

            return await Student.create({
                ...studentData,
                sid: newSid,
                deleted: false
            });
        } catch (error) {
            console.error('Error en create:', error);
            throw error;
        }
    }

    static async getAll(search = '', currentPage = 1, pageSize = 5) {
        try {
            const result = await Student.findAllWithPagination(search, currentPage, pageSize);
            return {
                items: result.rows,
                total: result.count,
                currentPage,
                pageSize,
                totalPages: Math.ceil(result.count / pageSize)
            };
        } catch (error) {
            console.error('Error en getAll:', error);
            throw new Error('Error al obtener estudiantes paginados');
        }
    }
}

module.exports = StudentService;