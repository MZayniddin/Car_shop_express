const router = require("express").Router();
const registerUser = require("../controllers/registerController");
const loginUser = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
