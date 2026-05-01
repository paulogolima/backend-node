import Sequelize from "sequelize"

import { User } from "../models/Users.js"

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
})

// Iniciar os models (Obrigatório)
User.init(connection)

// Iniciar as associações (Se tiver relacionamentos)
// Ex:
// User.associate(connection.models)

export default connection