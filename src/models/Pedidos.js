// Importações externas
import { Model, DataTypes } from 'sequelize'
import { User } from './Users.js'

class Pedidos extends Model {

    // Método para definir associações entre modelos.
    // Estabelece que um Pedido pertence a um Usuário (relacionamento muitos-para-um)
    static associate(models) {
        this.belongsTo(models.user, {
            foreignKey: 'users_id',  
            as: 'usuario'            
        })
    }

    // Método para inicializar o modelo e definir os atributos
    static init(sequelize) {
        super.init({
          
            // ID do pedido - chave primária
            id: {
                type:DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement: true,
            },
            // ID do usuário que fez o pedido - chave estrangeira
            users_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            // Data do pedido
            data: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            // Status do pedido - pode ser: pronto, preparando ou cancelado
            status: {
                type: DataTypes.ENUM('pronto', 'preparando', 'cancelado'),
                defaultValue: 'preparando',  
                allowNull: false,
            },
            
            // Valor total do pedido
            total:{
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
      
        },
        {
            sequelize,
            modelName:'pedidos',          
            tableName: 'pedidos',         
            timestamps: true,             // Adiciona campos createdAt e updatedAt automaticamente
        }
        )
    }
}

export {Pedidos}