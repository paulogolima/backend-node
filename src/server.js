import express from 'express'
import jwt from 'jsonwebtoken'

import connection from './config/database.js'
import {User} from './models/Users.js'
import router from './routers/userRouter.js'

const app = express()

app.use(express.json())
app.use('/api', router)



app.listen(3000,()=>{
    console.log("Servidor rodando em: http://localhost:3000")
})