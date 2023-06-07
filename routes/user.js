const router = require("express").Router();
const registerUser = require("../controllers/registerController");
const loginUser = require("../controllers/authController");
const { handleRefreshToken } = require("../controllers/refreshController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/refresh", handleRefreshToken);

module.exports = router;
