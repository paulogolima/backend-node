// Importações externas
import express from "express"

// Importações internas - Controllers e Middlewares
import { ItemController } from "../controllers/itemController.js"
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js"

// Cria uma instância de router do Express para rotas de itens
const itemRoutes = express.Router()

// Rotas com autenticação
itemRoutes.get('/itens/listar', authMiddleware, adminMiddleware, ItemController.findAll)

// Rotas genéricas com parâmetro :id
itemRoutes.post('/itens', authMiddleware, ItemController.create)
itemRoutes.get('/itens/:id', authMiddleware, ItemController.findByPk)
itemRoutes.put('/itens/:id', authMiddleware, ItemController.update)
itemRoutes.delete('/itens/:id', authMiddleware, ItemController.delete)

export { itemRoutes }
