// Importações externas
import "dotenv/config"
import Sequelize from "sequelize"

// Importações internas - Modelos
// Importa todos os modelos da aplicação (Users, Pedidos, Itens)
import { User } from "../models/Users.js"
import { Itens } from "../models/Itens.js"
import { Pedidos } from "../models/Pedidos.js"


// Cria conexão Sequelize com as credenciais do banco de dados
// As credenciais são obtidas das variáveis de ambiente (.env)
// Conexão usa MySQL como dialect
const connection = new Sequelize(
    process.env.NAME_DB,
    process.env.USER_DB,   
    process.env.PASS_DB
,
{
    host: process.env.HOST_DB,
    dialect: 'mysql'
}
)

// Inicializa todos os modelos com a conexão Sequelize (Obrigatório)
// Cada init() deve ser chamado antes de usar o modelo
User.init(connection)
Itens.init(connection)
Pedidos.init(connection)

// Inicializa as associações entre modelos
User.associate(connection.models)
Pedidos.associate(connection.models)
Itens.associate(connection.models)


// Exporta a conexão para ser utilizada em outros arquivos
export default connection