// Importações externas
import express from "express"

// Importações internas
import { UserController } from "../controllers/userController.js"
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js"

// Cria uma instância de router do Express
const router = express.Router()

// Rotas sem autenticação
router.post('/register/user', UserController.create)
router.post('/login/user', UserController.login)

// Rotas com autenticação
router.put('/user/:id',authMiddleware, UserController.update)
router.delete('/user/:id', authMiddleware, UserController.delete)
router.get('/users/listar', authMiddleware, adminMiddleware, UserController.findAll)

export default router