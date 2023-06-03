const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: String,
});

module.exports = mongoose.model("Brand", brandSchema);
