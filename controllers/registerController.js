const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
    const { email, password, username, image } = req.body;
    if (!email || !password)
        return res.json({ message: "Email and password required" });

    // CHECK DUPLICATE
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate)
        return res
            .status(409)
            .json({ message: "This email already registered" });

    try {
        // ENCRYPT PASSWORD
        const hashPwd = await bcrypt.hash(password, 10);

        // CREATE AND STORE NEW USER
        await User.create({
            email,
            password: hashPwd,
            username,
            image,
        });

        res.status(201).json({
            success: `New user ${username || email} created!`,
        });
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = handleRegister;
