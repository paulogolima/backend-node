//Importação internas - Controllers e Services
import { PedidoService } from '../services/pedidoService.js'

// Classe controladora para gerenciar requisições de pedidos
// Recebe as requisições HTTP e as passa para o serviço apropriado
class PedidoController {

    // Controlador para buscar todos os pedidos
    static async findAll(req,res) {
        PedidoService.findAll()
        .then(objs => res.json(objs))
        .catch(err => res.status(400).json({err: err.message}))
    }
    
    // Controlador para buscar um pedido específico pelo ID
    static async findByPk(req,res) {
        PedidoService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para criar um novo pedido
    static async create(req,res) {
        PedidoService.create(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para atualizar dados de um pedido existente
    static async update(req,res) {
        PedidoService.update(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para deletar um pedido do banco de dados
    static async delete(req,res) {
        PedidoService.delete(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }
}

export { PedidoController }