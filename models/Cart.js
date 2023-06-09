const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    cars: [
        {
            car: { type: mongoose.Types.ObjectId, ref: "Car", required: true },
            quantity: { type: Number, default: 1 },
        },
    ],
});

module.exports = mongoose.model("Cart", CartSchema);
