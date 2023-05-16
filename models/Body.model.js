const { sequelize, DataTypes } = require("../config/dbConn");

const Body = sequelize.define(
    "body",
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

module.exports = Body;
