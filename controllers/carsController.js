const { default: mongoose } = require("mongoose");
const Car = require("../models/Car");

exports.getAllCars = async (req, res) => {
    try {
        res.json(await Car.find());
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.createCar = async (req, res) => {
    try {
        const result = await Car.create({
            ...req.body,
            createdAt: new Date().toDateString(),
        });
        res.json(result);
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.updateCar = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id");

    try {
        const updateCar = await Car.findByIdAndUpdate(_id, req.body, {
            new: true,
        });
        res.json(updateCar);
    } catch (error) {
        res.json({ message: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("No post with that id");

    try {
        await Car.findByIdAndDelete(_id);
        res.json({ message: "Successfully deleted!" });
    } catch (error) {
        res.json({ message: error.message });
    }
};
