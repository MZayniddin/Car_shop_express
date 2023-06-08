const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
    const { userId } = req.params;
    if (userId !== req.user)
        return res.status(400).json({ message: "User doesn't match" });

    const { carId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, products: [] });
        }

        const existingProduct = cart.cars.find((c) => c.car.equals(carId));

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.cars.push({ car: carId, quantity });
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
