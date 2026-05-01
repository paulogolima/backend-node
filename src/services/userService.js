// Importações externas
import 'dotenv/config'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

// Importações internas
import { User } from "../models/Users.js"

class UserService {

    // Método para buscar todos os usuários do banco de dados
    static async findAll(req,res) {
        const objs = await User.findAll()
        
        return objs
    }

    // Método para buscar um usuário específico pelo ID
    static async findByPk(req,res) {
        const {id} = req.params
        const obj = await User.findByPk(id)

        return obj
    }

    // Método para criar um novo usuário com senha criptografada
    static async create(req,res) {
        const {nome, email, senha, cargo} = req.body

        // Gera hash da senha com salt 12 usando bcrypt
        const salt = 12
        const senhaHash = await bcrypt.hash(senha, salt)

        // Cria o novo usuário no banco de dados com a senha criptografada
        const obj = await User.create({nome, email, senha: senhaHash, cargo});

        // Retorna resposta com sucesso e dados do usuário (sem a senha)
        return {
            success: true,
            msg: "Usuário registrado com sucesso!",
            user:{
                id: obj.id,
                nome: obj.nome,
                email: obj.email,
                cargo: obj.cargo
            }
        }
    }

    // Método para autenticar usuário e gerar token JWT
    static async login(req, res) { 
        try{
            const {email, senha} = req.body

            // Valida se email e senha foram fornecidos
            if(!email || !senha) {
                return {
                    success: false,
                    msg: "Email e senha são obrigatórios"
                }
            }

            // Busca o usuário no banco de dados pelo email
            const user = await User.findOne({where: {email}})

            // Valida se o usuário existe
            if(!user) {
                return {
                    success: false,
                    msg: "Email ou senha inválidos"
                }
            }

            // Compara a senha fornecida com o hash armazenado no banco
            const senhaCorreta = await bcrypt.compare(senha, user.senha)

            // Valida se a senha está correta
            if(!senhaCorreta) {
                return {
                    success: false,
                    msg: "Email ou senha inválidos"
                }
            }

                // Gera token JWT com dados do usuário e validade de 24h
                const token = jwt.sign(
                    {id: user.id, email: user.email, cargo: user.cargo},
                    process.env.JWT_SECRET_KEY,
                    {expiresIn: "24h"}
                )

                // Retorna token e dados do usuário (sem a senha)
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

    // Método para atualizar dados de um usuário existente
    static async update(req,res) {
        try{
            const {id} = req.params
            const {nome, email, senha, cargo} = req.body
    
            // Busca o usuário no banco de dados
            var obj = await User.findOne({where: {id: id}})

            // Valida se o usuário existe
            if(!obj) {
                return {
                    success: false,
                    msg: "Usuário não encontrado"
                }
            }
            
            // Se uma nova senha for fornecida, criptografa antes de salvar
            if(senha) {
                const salt = 12
                const senhaNova = await bcrypt.hash(senha,salt)
                obj.senha = senhaNova
            }

            // Atualiza os campos fornecidos
            if(nome) obj.nome = nome
            if(email) obj.email = email 
            if(cargo) obj.cargo = cargo 

            // Salva as alterações no banco de dados
            obj = await obj.save()

            // Retorna resposta com sucesso e dados atualizados
            return {
                success: true,
                msg: "Usuário atualizado com sucesso!",
                user:{
                    id: obj.id,
                    nome: obj.nome,
                    email: obj.email,
                    cargo: obj.cargo
                }
            }
        }catch(err) {
            return {
                success: false,
                msg: `Erro ao atualizar usuário.\nerro: ${err.message}`            

            }
        }
    }


    // Método para deletar um usuário do banco de dados
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