// Importações externas
import 'dotenv/config'
import jwt from 'jsonwebtoken'

// Middleware para verificar se o usuário está autenticado (possui token JWT válido)
// Valida o token e extrai os dados do usuário
export const authMiddleware = (req, res, next) => {
    try{
        // Extrai o token do header Authorization (formato: "Bearer <token>")
        const token = req.headers.authorization?.split(' ')[1]

        // Valida se o token foi fornecido
        if(!token) {
            return res.status(401).json({
                success: false,
                msg: "Token não fornecido."
            })
        }

        // Verifica a validade do token usando a chave secreta
        const tokenData = jwt.verify(token, process.env.JWT_SECRET_KEY)
        // Armazena os dados do token no objeto request para uso posterior
        req.user = tokenData
        next()

    }catch(err){
        // Caso o token seja inválido ou tenha expirado
        return res.status(401).json({
            success: false,
            msg: "Token inválido ou expirado."
        })
    }
}

// Middleware para verificar se o usuário é administrador
// Valida se o usuário está autenticado E possui cargo de admin
export const adminMiddleware = (req, res, next) => {
    try{
        // Valida se o usuário está autenticado
        if(!req.user) {
            return res.status(401).json({
                success: false,
                msg: "Token não fornecido."
            })
        }

        // Verifica se o cargo do usuário é "admin"
        if(req.user.cargo !== "admin") {
            return res.status(403).json({
                success: false,
                msg: "Acesso negado! Apenas admins podem acessar."
            })
        }
        next()
    }catch(err) {
        // Caso haja erro ao verificar permissão
        return res.status(403).json({
            success: false,
            msg: "Falha ao verificar permissão."
        })
    } 
}

export default { authMiddleware, adminMiddleware }