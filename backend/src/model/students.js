const { DataTypes, Model, Op } = require("sequelize");

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

    static async findAllWithPagination(search, currentPage, pageSize) {
        const offset = (currentPage - 1) * pageSize;
        const whereClause = {
            deleted: false,
            ...(search && {
                [Op.or]: [
                    { lastname: { [Op.substring]: search } },
                    { firstname: { [Op.substring]: search } }
                ]
            })
        };

        return this.findAndCountAll({
            where: whereClause,
            limit: pageSize,
            offset,
            order: [['lastname', 'ASC'], ['firstname', 'ASC']]
        });
    }
}

module.exports = Student;