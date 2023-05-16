const { sequelize, DataTypes } = require("../config/dbConn");

const Brand = sequelize.define(
    "brand",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    { timestamps: false }
);

module.exports = Brand;
