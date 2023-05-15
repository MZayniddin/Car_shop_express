const { sequelize, DataTypes } = require("../config/dbConn");

const Color = sequelize.define("color", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
});

module.exports = Color;
