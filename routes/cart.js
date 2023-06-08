const router = require("express").Router();
const cartCtr = require("../controllers/cartController");

router.post("/:userId", cartCtr.addToCart);
router.delete("/:carId", cartCtr.removeFromCart);

module.exports = router;
