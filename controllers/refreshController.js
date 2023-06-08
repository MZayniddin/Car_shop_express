const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden

    // evaluate jwt
    jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY, (err, decoded) => {
        if (err || !foundUser._id.equals(decoded.UserInfo.id))
            return res.sendStatus(403);
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                UserInfo: {
                    id: decoded.id,
                    email: decoded.email,
                    roles: roles,
                },
            },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: process.env.ACCESS_TIME }
        );
        res.json({ accessToken });
    });
};

module.exports = { handleRefreshToken };
