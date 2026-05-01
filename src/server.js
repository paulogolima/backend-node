// Impoetações externas
import express from 'express'

// Importações internas
import connection from './config/database.js'
import {User} from './models/Users.js'
import router from './routers/userRouter.js'

// Cria instância do Express
const app = express()

// Obtém a porta do servidor das variáveis de ambiente
const PORT = process.env.SERVER_PORT

// Middleware para parsear JSON nas requisições
app.use(express.json())

// Define as rotas da API no prefixo /api
app.use('/api', router)

// Sincroniza os modelos com o banco de dados e inicia o servidor
connection.sync().then(() => {
    app.listen(PORT, () => { 
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
    })
}).catch((err) => {
    // Caso haja erro na conexão com o banco de dados
    console.log(`Erro ao conectar com o banco de dados. ERRO: ${err} `)
})