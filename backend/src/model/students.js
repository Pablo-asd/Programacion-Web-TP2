const { Model, DataTypes, Op, Sequelize } = require('sequelize');

class Student extends Model {
    static initModel(sequelize) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            sid: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: true
            },
            firstname: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            lastname: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            dni: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING(150),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        }, {
            sequelize,
            modelName: 'students',
            tableName: 'students',
            timestamps: true
        });
    }

    static async getAll() {
        return this.findAll({
            where: { deleted: false },
            attributes: { exclude: ['deleted', 'createdAt', 'updatedAt'] }
        });
    }

    static async getLastSID() {
        return this.max('sid') || 0;
    }

    static async findByDniOrEmail(dni, email) {
        return this.findOne({
            where: {
                [Op.or]: [{ dni }, { email }],
                deleted: false
            }
        });
    }
    static async findAllWithPagination(search = '', currentPage = 1, pageSize = 5) {
        const offset = (currentPage - 1) * pageSize;
        
        const whereClause = {
            deleted: false // Asumiendo que usas false en lugar de 0
        };
    
        // Agregar condición de búsqueda si existe
        if (search && search.trim()) {
            whereClause[Op.or] = [
                Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('lastname')),
                    Op.like,
                    `%${search.trim().toLowerCase()}%`
                )
            ];
        }

        const result = await this.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset: offset,
            order: [
                ['lastname', 'ASC'],
                ['firstname', 'ASC']
            ],
            attributes: {
                exclude: ['deleted', 'createdAt', 'updatedAt']
            }
        });

        return result;
    } catch (error) {
        console.error('Error en findAllWithPagination:', error);
        throw error;
    }
}

module.exports = Student;