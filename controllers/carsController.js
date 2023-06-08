const { default: mongoose } = require("mongoose");
const Car = require("../models/Car");

exports.getAllCars = async (req, res) => {
    try {
        res.json(
            await Car.aggregate([
                {
                    $lookup: {
                        from: "brands",
                        localField: "brand",
                        foreignField: "_id",
                        as: "brand",
                    },
                },
                {
                    $unwind: {
                        path: "$brand", // given name
                        preserveNullAndEmptyArrays: true,
                    },
                },
            ])
        );
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

exports.likeCar = async (req, res) => {
    const { id } = req.params;
    if (!req.user) return res.status(400).json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No post with that id");

    const car = await Car.findById(id);
    if (!car) return res.status(404).json({ message: "Car not found!" });
    
    const index = car.likes.findIndex((id) => id === String(req.user));

    if (index === -1) {
        car.likes.push(req.user);
    } else {
        car.likes = car.likes.filter((id) => id !== String(req.user));
    }

    const updatedCar = await Car.findByIdAndUpdate(id, car, {
        new: true,
    });

    res.json(updatedCar);
};
