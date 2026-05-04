//Importação internas - Controllers e Services
import { ItemService } from '../services/itemService.js'

// Classe controladora para gerenciar requisições de itens de pedidos
// Recebe as requisições HTTP e as passa para o serviço apropriado
class ItemController {

    // Controlador para buscar todos os itens
    static async findAll(req,res) {
        ItemService.findAll()
        .then(objs => res.json(objs))
        .catch(err => res.status(400).json({err: err.message}))
    }
    
    // Controlador para buscar um item específico pelo ID
    static async findByPk(req,res) {
        ItemService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para criar um novo item
    static async create(req,res) {
        ItemService.create(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para atualizar dados de um item existente
    static async update(req,res) {
        ItemService.update(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para deletar um item do banco de dados
    static async delete(req,res) {
        ItemService.delete(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }
}

export { ItemController }