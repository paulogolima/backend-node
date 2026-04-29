import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from "../models/Users.js"

class UserService {

    static async findAll(req,res) {
        const objs = await User.findAll()
        
        return objs
    }

    static async findByPk(req,res) {
        const {id} = req.params
        const obj = await User.findByPk(id)

        return obj
    }

    static async create(req,res) {
        const {nome, email, senha, cargo} = req.body

        const salt = 12
        const senhaHash = await bcrypt.hash(senha, salt)

        const obj = await User.create({nome, email, senha: senhaHash, cargo});

        return {
            success: true,
            msg: "Usuário registrado com sucesso!",
            obj:{
                id: obj.id,
                nome: obj.nome,
                email: obj.email,
                cargo: obj.cargo
            }
        }
    }

    static async login(req, res) { 
        try{
            const {email, senha} = req.body

            if(!email || !senha) {
                return {
                    success: false,
                    msg: "Email e senha são obrigatórios"
                }
            }

            const user = await User.findOne({where: {email}})

            if(!user) {
                return {
                    success: false,
                    msg: "Email ou senha inválidos"
                }
            }

            const senhaCorreta = await bcrypt.compare(senha, user.senha)

            if(!senhaCorreta) {
                return {
                    success: false,
                    msg: "Email ou senha inválidos"
                }
            }

                const token = jwt.sign(
                    {id: user.id, email: user.email},
                    process.env.SECRET_KEY,
                    {expiresIn: "24h"}
                )

                return({
                    success: true,
                    token,
                    user: {
                        id: user.id,
                        nome: user.nome,
                        email: user.email,
                        cargo: user.cargo
                    }
                })
            } catch(err){
                return {
                    success: false,
                    msg: `Erro no servidor: ${err.message}`
                }
            }
    
    }

    static async update(req,res) {
        const {id} = req.params
        const {nome, email, senha, cargo} = req.body

        // Criptografar novamente a senha após atualizar user

        var obj = await User.findOne({where: {id: id}})

        Object.assign(obj, {nome, email, senha, cargo})
        obj = await obj.save()

        return obj
    }

    static async delete(req,res) {
        const {id} = req.params

        var obj = await User.findByPk(id)

        // Preciso reorganizar o nº de id do banco sempre qu deletar algum user

        obj = await obj.destroy()
        return {
             success: true,
            msg: "Usuário deletado com sucesso!",
            obj:{
                id: obj.id,
                nome: obj.nome,
                email: obj.email,
                cargo: obj.cargo
            }
        }
    }
}

export { UserService } 