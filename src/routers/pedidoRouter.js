// Importações externas
import express from "express"

// Importações internas - Controllers e Middlewares
import { PedidoController } from "../controllers/pedidoController.js"
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js"

// Cria uma instância de router do Express para rotas de pedidos
const pedidoRoutes = express.Router()

// Rotas com autenticação
pedidoRoutes.get('/pedidos/listar', authMiddleware, adminMiddleware, PedidoController.findAll)

// Rotas genéricas com parâmetro :id
pedidoRoutes.post('/pedidos', authMiddleware, PedidoController.create)
pedidoRoutes.get('/pedidos/:id', authMiddleware, PedidoController.findByPk)
pedidoRoutes.put('/pedidos/:id', authMiddleware, PedidoController.update)
pedidoRoutes.delete('/pedidos/:id', authMiddleware, PedidoController.delete)

export { pedidoRoutes }
