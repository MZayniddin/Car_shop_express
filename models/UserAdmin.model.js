const { sequelize, DataTypes } = require("../config/dbConn");

const UserAdmin = sequelize.define(
    "useradmin",
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
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        created_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        last_updated: {
            type: DataTypes.DATE,
        },
    },
    { timestamps: false }
);

module.exports = UserAdmin;
