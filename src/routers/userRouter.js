// Importações externas
import express from "express"

// Importações internas
import { UserController } from "../controllers/userController.js"
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js"

// Cria uma instância de router do Express para rotas de usuários
const userRoutes = express.Router()

// Rotas sem autenticação
userRoutes.post('/register/user', UserController.create)
userRoutes.post('/login/user', UserController.login)

// Rotas com autenticação
userRoutes.put('/user/:id',authMiddleware, UserController.update)
userRoutes.delete('/user/:id', authMiddleware, UserController.delete)
userRoutes.get('/users/listar', authMiddleware, adminMiddleware, UserController.findAll)

export { userRoutes }