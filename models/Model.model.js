const { sequelize, DataTypes } = require("../config/dbConn");

const Model = sequelize.define("model", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    brand_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Model;
