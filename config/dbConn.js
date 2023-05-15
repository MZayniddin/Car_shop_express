const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
    username: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,  
    dialect: "postgres",
});

module.exports = {
    sequelize,
    DataTypes,
};
