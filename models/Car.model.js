const { sequelize, DataTypes } = require("../config/dbConn");

const Car = sequelize.define("car", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    model: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    transmission: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    body: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    max_speed: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    is_sold: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_public: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    engine: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    create_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    create_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    last_updated: {
        type: DataTypes.DATE,
    },
});

module.exports = Car;
