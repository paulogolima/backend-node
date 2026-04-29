import { Model, DataTypes } from 'sequelize'

class User extends Model {

    static associate(models) {
        //  Associação entre models aqui
    }

    static init(sequelize) {
        super.init({
            id: {
                type:DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement: true,
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                set(value){
                    this.setDataValue('email', value.toLowerCase())
                },
                validate:{
                    isEmail:{
                        msg:"Formato de email inválido"
                    }
                }
            },
            senha:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            cargo:{
                type: DataTypes.ENUM('admin', 'user'),
                allowNull: false,
                defaultValue: 'user',
            }
        },
        {
            sequelize,
            modelName:'user',
            tableName: 'users',
            timestamps: true,
        })
    }
}

export {User}