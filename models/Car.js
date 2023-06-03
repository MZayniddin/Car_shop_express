const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const carSchema = new Schema({
    name: { type: String, required: true },
    transmission: { type: String, required: true },
    toning: { type: Boolean, default: false },
    motor: { type: String, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    distance: Number,
    description: { type: String, required: true },
    images: [{ type: String }],
});

module.exports = mongoose.model("Car", carSchema);
