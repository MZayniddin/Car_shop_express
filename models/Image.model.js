const { sequelize, DataTypes } = require("../config/dbConn");

const Image = sequelize.define("image", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
    },
    content_type: {
        type: DataTypes.TEXT,
    },
    data: {
        type: DataTypes.BLOB,
    },
    car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Image;
