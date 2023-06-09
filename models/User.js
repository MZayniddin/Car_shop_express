const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: String,
    roles: {
        User: {
            type: Number,
            default: 2001,
        },
        Admin: Number,
    },
    refreshToken: String,
});

module.exports = mongoose.model("User", UserSchema);
