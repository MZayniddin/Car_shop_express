const { default: mongoose } = require("mongoose");
const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user }).populate(
            "cars.car"
        );

        if (!cart) return res.status(404).json({ message: "Cart not found!" });

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const { carId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(carId))
        return res
            .status(400)
            .json({ message: "Car doesn't exists with that ID" });

    try {
        let cart = await Cart.findOne({ user: req.user });

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const existingProduct = cart.cars.find((c) => c.car.equals(carId));

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.cars.push({ car: carId });
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.reduceFromCart = async (req, res) => {
    console.log("HELLO");
    const { carId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(carId))
        return res
            .status(400)
            .json({ message: "Car doesn't exists with that ID" });

    try {
        let cart = await Cart.findOne({ user: req.user });

        if (!cart) return res.status(404).json({ message: "Cart not found!" });

        const existingCar = cart.cars.find((c) => c.car.equals(carId));
        if (!existingCar)
            return res.status(404).json({ message: "Car not found in cart" });

        if (existingCar.quantity > 1) {
            existingCar.quantity -= 1;
        } else {
            cart.cars.forEach((c, index) => {
                if (c.car.equals(existingCar.car)) {
                    cart.cars.splice(index, 1);
                }
            });
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { carId } = req.params;

    try {
        let cart = await Cart.findOne({ user: req.user });
        if (!cart) return res.status(404).json({ message: "Cart not found!" });

        const carIndex = cart.cars.findIndex((c) => c.car.equals(carId));

        if (carIndex === -1)
            return res.status(404).json({ message: "Car not found in cart" });

        cart.cars.splice(carIndex, 1);
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
