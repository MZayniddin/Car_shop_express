const Car = require("../models/Car");

exports.getAllCars = async (req, res) => {
    try {
        res.json(await Car.find());
    } catch (error) {
        res.json({ message: error.message });
    }
};
