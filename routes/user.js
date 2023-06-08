const router = require("express").Router();
const registerUser = require("../controllers/registerController");
const loginUser = require("../controllers/authController");
const { handleRefreshToken } = require("../controllers/refreshController");
const { handleLogout } = require("../controllers/logoutController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);
router.get("/logout", handleLogout);

module.exports = router;
