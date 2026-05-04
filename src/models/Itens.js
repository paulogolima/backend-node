// Importações externas
import { Model, DataTypes } from 'sequelize'
// Importa o modelo Pedidos para estabelecer o relacionamento
import { Pedidos } from './Pedidos.js'

class Itens extends Model {

    // Método para definir associações entre modelos.
    // Estabelece que cada Item pertence a um Pedido (relacionamento muitos-para-um)
    static associate(models) {
        this.belongsTo(models.pedidos, {
            foreignKey: 'pedido_id',  
            as: 'pedido'              
        })
    }

    // Método para inicializar o modelo e definir os atributos
    static init(sequelize) {
        super.init({
          
            // ID do item - chave primária
            id: {
                type:DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement: true,
            },
            // ID do pedido ao qual este item pertence - chave estrangeira
            pedido_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            // ID do produto que está sendo pedido
            produto_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true,
            },
            // Quantidade de produtos neste item
            quantidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            // Preço unitário do produto neste item
            preco: {
                type: DataTypes.DECIMAL,
                allowNull: false,
            },
      
        },
        {
            sequelize,
            modelName:'item',        
            tableName: 'itens',        
            timestamps: true,          // Adiciona campos createdAt e updatedAt automaticamente
        }
        )
    }
}

export {Itens}