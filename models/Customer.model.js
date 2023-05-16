const { sequelize, DataTypes } = require("../config/dbConn");

const Customer = sequelize.define(
    "customer",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        tel: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        passport: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    { timestamps: false }
);

module.exports = Customer;
