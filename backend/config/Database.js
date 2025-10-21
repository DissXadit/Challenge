import { Sequelize } from "sequelize";

const db = new Sequelize('database_auth', 'root', '', {
    host: "localhost",
    dialect: "mysql"
} );

export default db;