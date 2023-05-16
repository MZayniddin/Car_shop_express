const Car = require("./Car.model");
const Body = require("./Body.model");
const Brand = require("./Brand.model");
const Color = require("./Color.model");
const Customer = require("./Customer.model");
const Image = require("./Image.model");
const Model = require("./Model.model");
const Purchase = require("./Purchase.model");
const Transmission = require("./Transmission.model");
const UserAdmin = require("./UserAdmin.model");

Model.hasMany(Car, {
    foreignKey: "model",
    onDelete: "CASCADE",
});
Car.belongsTo(Model);

Color.hasMany(Car, {
    foreignKey: "color",
    onDelete: "CASCADE",
});
Car.belongsTo(Color);

Transmission.hasMany(Car, {
    foreignKey: "transmission",
    onDelete: "CASCADE",
});
Car.belongsTo(Transmission);

Body.hasMany(Car, {
    foreignKey: "body",
    onDelete: "CASCADE",
});
Car.belongsTo(Body);

UserAdmin.hasMany(Car, {
    foreignKey: "create_by",
    onDelete: "CASCADE",
});
Car.belongsTo(UserAdmin);

Car.hasMany(Image);
Image.belongsTo(Car, {
    foreignKey: "car_id",
    onDelete: "CASCADE",
});

Model.hasMany(Brand);
Brand.belongsTo(Model, {
    foreignKey: "brand_id",
    onDelete: "CASCADE",
});

Car.belongsToMany(UserAdmin, {
    through: Purchase,
    foreignKey: "car_id",
    onDelete: "CASCADE",
});

UserAdmin.belongsToMany(Car, {
    through: Purchase,
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

Customer.belongsToMany(Car, {
    through: Purchase,
    foreignKey: "customer_id",
    onDelete: "CASCADE",
});

module.exports = {
    Car,
    Body,
    Brand,
    Color,
    Customer,
    Image,
    Model,
    Purchase,
    Transmission,
    UserAdmin,
};
