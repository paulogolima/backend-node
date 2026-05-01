//Importação internas 
import { UserService } from '../services/userService.js'

class UserController {

    // Controlador para buscar todos os usuários
    static async findAll(req,res) {
        UserService.findAll()
        .then(objs => res.json(objs))
        .catch(err => res.status(400).json({err: err.message}))
    }
    
    // Controlador para buscar um usuário pelo ID
    static async findByPk(req,res) {
        UserService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para criar um novo usuário
    static async create(req,res) {
        UserService.create(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para fazer login e retornar token JWT
    static async login(req,res) {
        UserService.login(req)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para atualizar dados de um usuário
    static async update(req,res) {
        UserService.update(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    // Controlador para deletar um usuário
    static async delete(req,res) {
        UserService.delete(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }
}

export { UserController }