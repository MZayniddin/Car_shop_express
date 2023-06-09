const { default: mongoose } = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
    try {
        res.json(await User.find());
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const { email, username, password } = req.body;
    if (!password)
        return res.status(400).json({ message: "Password required!" });

    try {
        let user = await User.findOne({ _id: req.user });
        if (!user) return res.json("User doesn't match!");

        const checkPwd = await bcrypt.compare(password, user.password);
        if (!checkPwd)
            return res.status(400).json({ message: "Incorrect password!" });

        if (email) user.email = email;
        if (username) user.username = username;

        await user.save();

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId))
        return res.status(400).json({ message: "User not found with that ID" });

    try {
        const result = await User.findByIdAndDelete(userId);
        res.json({ message: `User ${result.email} successfully deleted` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
