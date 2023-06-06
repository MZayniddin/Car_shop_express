const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password)
        return res
            .status(400)
            .json({ message: "email and password are required" });

    try {
        // CHECK THE USER EXISTS
        const foundUser = await User.findOne({ email }).exec();
        if (!foundUser)
            return res.status(401).json({ message: "User not found!" });

        // CHECK THE PASSWORD
        const checkPwd = await bcrypt.compare(password, foundUser.password);
        if (!checkPwd)
            return res.status(401).json({ message: "Invalid password" });

        // VERIFY
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                UserInfo: { email: foundUser.email, roles },
            },
            process.env.ACCESS_SECRET_KEY,
            {
                expiresIn: process.env.ACCESS_TIME,
            }
        );
        const refreshToken = jwt.sign(
            {
                UserInfo: { email: foundUser.email, roles },
            },
            process.env.REFRESH_SECRET_KEY,
            {
                expiresIn: process.env.REFRESH_TIME,
            }
        );
        // SAVING USER'S REFRESH TOKEN
        foundUser.refreshToken = refreshToken;
        await foundUser.save();

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 100,
        });

        res.json({ result: foundUser, accessToken });
    } catch (error) {
        res.json({ message: error.message });
    }
};

module.exports = handleLogin;
