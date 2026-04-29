import express from "express"
import { UserController } from "../controllers/userController.js"

const router = express.Router()

// Adicionar às rotas a autenticação de token e admin

router.post('/register/user', UserController.create)
router.post('/login/user', UserController.login)
router.put('/user/:id',UserController.update)
router.delete('/user/:id', UserController.delete)
router.get('/users/listar', UserController.findAll)

export default router