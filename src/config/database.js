// Importações externas
import "dotenv/config"
import Sequelize from "sequelize"

// Importações internas 
import { User } from "../models/Users.js"

// Cria conexão Sequelize com as credenciais do banco de dados
// As credenciais são obtidas das variáveis de ambiente (.env)
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

// Inicializa o modelo User com a conexão Sequelize (Obrigatório)
User.init(connection)

// Inicializa as associações entre modelos (Se tiver relacionamentos)
// Comentado pois este projeto não utiliza relacionamentos
// User.associate(connection.models)

// Exporta a conexão para ser utilizada em outros arquivos
export default connection