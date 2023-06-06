const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
    name: { type: String, required: true },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    transmission: { type: String, required: true },
    price: { type: Number, required: true },
    toning: { type: Boolean, default: false },
    motor: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    distance: Number,
    createdAt: { type: Date, default: new Date() },
});

module.exports = mongoose.models.Car || mongoose.model("Car", CarSchema);
