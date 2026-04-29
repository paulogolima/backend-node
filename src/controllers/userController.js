import { UserService } from '../services/userService.js'

class UserController {

    static async findAll(req,res) {
        UserService.findAll()
        .then(objs => res.json(objs))
        .catch(err => res.status(400).json({err: err.message}))
    }

    static async findByPk(req,res) {
        UserService.findByPk(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    static async create(req,res) {
        UserService.create(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    static async login(req,res) {
        UserService.login(req)
        .then(user => res.json(user))
        .catch(err => res.status(400).json({err: err.message}))
    }

    static async update(req,res) {
        UserService.update(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }

    static async delete(req,res) {
        UserService.delete(req)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json({err: err.message}))
    }
}

export { UserController }