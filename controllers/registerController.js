const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
    const { email, password, username, image, confirmPassword } = req.body;
    if (!email || !password)
        return res.json({ message: "Email and password required" });

    // CHECK DUPLICATE
    const duplicate = await User.findOne({ email }).exec();
    if (duplicate)
        return res
            .status(409)
            .json({ message: "This email already registered" });

    if (password !== confirmPassword)
        return res
            .status(400)
            .json({ message: "Confirm Password was Incorrect!" });

    try {
        // ENCRYPT PASSWORD
        const hashPwd = await bcrypt.hash(password, 10);

        // CREATE AND STORE NEW USER
        const newUser = await User.create({
            email,
            password: hashPwd,
            username,
            image,
        });

        // CREATE TOKEN
        const roles = Object.values(newUser.roles);
        const accessToken = jwt.sign(
            {
                UserInfo: { email: newUser.email, roles },
            },
            process.env.ACCESS_SECRET_KEY,
            {
                expiresIn: process.env.ACCESS_TIME,
            }
        );

        res.status(201).json({ result: newUser, accessToken });
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = handleRegister;
