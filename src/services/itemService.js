// Importações externas
import 'dotenv/config'

// Importações internas
import { Itens } from "../models/Itens.js"

class ItemService {

    // Método para buscar todos os itens do banco de dados
    static async findAll(req,res) {
        const objs = await Itens.findAll({
            include: {association: 'pedido'}
        })
        
        return objs
    }

    // Método para buscar um item específico pelo ID
    static async findByPk(req,res) {
        const {id} = req.params

        // Busca o item no banco pelo ID e carrega os dados do pedido associado
        const obj = await Itens.findByPk(id, {
            include: {association: 'pedido'}
        })

        return obj
    }

    // Método para criar um novo item
    static async create(req,res) {
        const { pedido_id, produto_id, quantidade, preco } = req.body

        // Cria o novo item no banco de dados
        const obj = await Itens.create({pedido_id, produto_id, quantidade, preco});

        // Recarrega o item do banco com os dados do pedido associado
        await obj.reload({include: {association: 'pedido'}})

        // Retorna resposta com sucesso e dados do item
        return {
            success: true,
            msg: "Item registrado com sucesso!",
            item: {
                id: obj.id,
                pedido_id: obj.pedido_id,
                produto_id: obj.produto_id,
                quantidade: obj.quantidade,
                preco: obj.preco,
            }
        }
    }

    // Método para atualizar dados de um item existente
    static async update(req,res) {
        try{
            const {id} = req.params
            const {quantidade, preco} = req.body
    
            // Busca o item no banco de dados
            var obj = await Itens.findOne({where: {id: id},
                 include: {association: 'pedido'}
                })

            // Valida se o item existe
            if(!obj) {
                return {
                    success: false,
                    msg: "Item não encontrado"
                }
            }
            
            // Atualiza os campos fornecidos
            if(quantidade) obj.quantidade = quantidade
            if(preco) obj.preco = preco 
     
            // Salva as alterações no banco de dados
            obj = await obj.save()

            // Retorna resposta com sucesso e dados atualizados
            return {
                success: true,
                msg: "Item atualizado com sucesso!",
                item: {
                    id: obj.id,
                    pedido_id: obj.pedido_id,
                    produto_id: obj.produto_id,
                    quantidade: obj.quantidade,
                    preco: obj.preco,
                }
            }
        }catch(err) {
            return {
                success: false,
                msg: `Erro ao atualizar item.\nerro: ${err.message}`            
                
            }
        }
    }


    // Método para deletar um item do banco de dados
    static async delete(req,res) {
        const {id} = req.params

        // Busca o item antes de deletar para retornar os dados
        var obj = await Itens.findByPk(id, {
            include: {association: 'pedido'}
        })

        // Valida se o item existe
        if(!obj) {
            return{
                success: false,
                msg: "Item não encontrado"
            }
        }

        // Deleta o item do banco de dados
        await obj.destroy()

        return {
             success: true,
            msg: "Item deletado com sucesso!",
            item: {
                id: obj.id,
                pedido_id: obj.pedido_id,
                produto_id: obj.produto_id,
                quantidade: obj.quantidade,
                preco: obj.preco,
            }
        } 
    }
}

export { ItemService } 