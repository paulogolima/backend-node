// Importações externas
import { Model, DataTypes } from 'sequelize'

class User extends Model {

    // Método para definir associações entre modelos 
    static associate(models) {
        //  Associação entre models aqui
    }

    // Método que inicializa o modelo User com seus campos e validações
    static init(sequelize) {
        super.init({
            // Campo ID: chave primária, auto-incrementado
            id: {
                type:DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement: true,
            },
            // Campo Nome: string obrigatória
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Campo Email: string única, obrigatória, com validação de formato
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                // Converte o email para minúsculas antes de salvar
                set(value){
                    this.setDataValue('email', value.toLowerCase())
                },
                // Valida se o formato do email é válido
                validate:{
                    isEmail:{
                        msg:"Formato de email inválido"
                    }
                }
            },
            // Campo Senha: string obrigatória (armazenada com hash bcrypt)
            senha:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Campo Cargo: ENUM que define o papel do usuário (admin ou user)
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
            timestamps: true,        // Adiciona campos createdAt e updatedAt
        }
        )
    }
}

export {User}