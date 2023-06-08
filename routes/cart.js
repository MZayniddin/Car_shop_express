const router = require("express").Router();
const cartCtr = require("../controllers/cartController");

router.post("/:userId", cartCtr.addToCart);

module.exports = router;
