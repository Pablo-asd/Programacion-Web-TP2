const{DataTypes,Model, where} = require("sequelize");

class Student extends Model{
    static initModel(sequelize){
        super.init({
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            sid:{
                type: DataTypes.BIGINT,
                allowNull: false
            },
            firstname:{
                type: DataTypes.STRING,
                allowNull: false
            },
            lastname:{
                type: DataTypes.STRING,
                allowNull: false
            },
            dni:{
                type: DataTypes.BIGINT,
                allowNull: false
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'students',
            tableName: 'students'
        });

        return this;
    };

    static async getAll() {
        try {
            return await this.findAll({
                attributes: { exclude: ['deleted', 'createdAt', 'updatedAt'] }
            });
        } catch (error) {
            console.error("Error in getAll:", error);
            throw error;
        }
    }



};

module.exports = Student;

