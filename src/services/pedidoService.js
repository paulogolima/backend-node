// Importações externas
import 'dotenv/config'

// Importações internas
import { Pedidos } from "../models/Pedidos.js"

class PedidoService {

    // Método para buscar todos os usuários do banco de dados
    static async findAll(req,res) {
        const objs = await Pedidos.findAll({
            include: {association: 'usuario'}
        })
        
        return objs
    }

    // Método para buscar um pedido específico pelo ID
    static async findByPk(req,res) {
        const {id} = req.params

        // Busca o pedido no banco pelo ID e carrega os dados do usuário associado
        const obj = await Pedidos.findByPk(id, {
            include: {association: 'usuario'}
        })

        return obj
    }

    // Método para criar um novo pedido
    static async create(req,res) {
        const {users_id, data, status, total} = req.body

        // Cria o novo usuário no banco de dados com a senha criptografada
        const obj = await Pedidos.create({users_id, data, status, total});

        // Recarrega o pedido do banco com os dados do usuário associado
        await obj.reload({include: {association: 'usuario'}})

        // Retorna resposta com sucesso e dados do pedido e usuário
        return {
            success: true,
            msg: "Pedido registrado com sucesso!",
            pedido: {
                id: obj.id,
                users_id: obj.users_id,
                data: obj.data,
                status: obj.status,
                total: obj.total,
            },
            users: {
                id: obj.usuario.id,
                nome: obj.usuario.nome,
            }
        }
    }

    // Método para atualizar dados de um pedido existente
    static async update(req,res) {
        try{
            const {id} = req.params
            const {status, total} = req.body
    
            // Busca o pedido no banco de dados
            var obj = await Pedidos.findOne({where: {id: id},
                 include: {association: 'usuario'}
                })

            // Valida se o pedido existe
            if(!obj) {
                return {
                    success: false,
                    msg: "Pedido não encontrado"
                }
            }
            
            // Atualiza os campos fornecidos
            if(status) obj.status = status
            if(total) obj.total = total 
     
            // Salva as alterações no banco de dados
            obj = await obj.save()

            // Retorna resposta com sucesso e dados atualizados
            return {
                success: true,
                msg: "Pedido atualizado com sucesso!",
                pedido: {
                    id: obj.id,
                    data: obj.data,
                    status: obj.status,
                    total: obj.total
                },
                users: {
                    users_id: obj.usuario.id,
                    nome: obj.usuario.nome,
                }
            }
        }catch(err) {
            return {
                success: false,
                msg: `Erro ao atualizar pedido.\nerro: ${err.message}`            

            }
        }
    }


    // Método para deletar um pedido do banco de dados
    static async delete(req,res) {
        const {id} = req.params

        var obj = await Pedidos.findByPk(id, {
            include: {association: 'usuario'}
        })

        //  Valida se o pedido existe
        if(!obj) {
            return{
                success: false,
                msg: "Pedido não encontrado"
            }
        }
        // Preciso reorganizar o nº de id do banco sempre qu deletar algum pedido

        obj = await obj.destroy()

        return {
             success: true,
            msg: "Pedido deletado com sucesso!",
            pedido: {
                id: obj.id,
                data: obj.data,
                status: obj.status,
                total: obj.total
            },
            users: {
                users_id: obj.usuario.id,
                nome: obj.usuario.nome,
            }
        } 
    }
}

export { PedidoService } 