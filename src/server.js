import express from 'express'

import connection from './config/database.js'
import {User} from './models/Users.js'
import router from './routers/userRouter.js'

const app = express()
const PORT = process.env.SERVER_PORT
app.use(express.json())
app.use('/api', router)

connection.sync().then(() => {
    app.listen(PORT, () => { 
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
    })
}).catch((err) => {
    console.log(`Erro ao conectar com o banco de dados. ERRO: ${err} `)
})