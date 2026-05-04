// Importações externas
import express from 'express'

// Importações internas - Configuração e Rotas
import connection from './config/database.js'
import {User} from './models/Users.js'
import { userRoutes } from './routers/userRouter.js'
import { pedidoRoutes } from './routers/pedidoRouter.js'
import { itemRoutes } from './routers/itemRouter.js'

// Cria instância do Express
const app = express()

// Obtém a porta do servidor das variáveis de ambiente
const PORT = process.env.SERVER_PORT

// Middleware para parsear requisições JSON
app.use(express.json())

// Define as rotas da API no prefixo /api
// Todas as rotas de usuários, pedidos e itens passam por aqui
app.use('/api', userRoutes)
app.use('/api', pedidoRoutes)
app.use('/api', itemRoutes)

// Sincroniza os modelos com o banco de dados e inicia o servidor
connection.sync().then(() => {
    app.listen(PORT, () => { 
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
    })
}).catch((err) => {
    // Caso haja erro na conexão com o banco de dados
    console.log(`Erro ao conectar com o banco de dados. ERRO: ${err} `)
})