const sequelize = require("sequelize");
const{DataTypes,Model} = require("sequelize");

class Student extends Model{
    static init = sequelize =>{
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
            modelName: 'students'
        });

        return this;
    };

    static getAll = async () =>{
        return await this.findAll({
            where:{
                deleted:'0'
            },
            attributes:{
                exclude: 'deleted, createdAt,updatedAt'
            }
        });
    };
};

module.exports = Student;

