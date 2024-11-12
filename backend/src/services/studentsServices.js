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

    static async getPaginated(search, currentPage, pageSize) {
        try {
            // Validar y convertir parámetros
            const page = Math.max(1, parseInt(currentPage));
            const size = Math.max(1, Math.min(50, parseInt(pageSize) || 5)); // Máximo 50 registros por página
            const searchTerm = search? search?.trim() : '';

            const result = await Student.findAllWithPagination(searchTerm, page, size);

            return {
                items: result.rows,
                total: result.count,
                currentPage: page,
                pageSize: size,
                totalPages: Math.ceil(result.count / size)
            };
        } catch (error) {
            console.error('Error en getPaginated:', error);
            throw new Error('Error al obtener estudiantes paginados');
        }
    }

    static async deleteStudent(id) {
        try {
            const student = await Student.findOne({
                where: { 
                    id,
                    deleted: false 
                }
            });

            if (!student) {
                throw new Error('Estudiante no encontrado');
            }

            const result = await Student.softDelete(id);
            return result;
        } catch (error) {
            console.error('Error en deleteStudent:', error);
            throw error;
        }
    }
}

module.exports = StudentService;