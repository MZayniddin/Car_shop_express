const router = require("express").Router();
const cartCtr = require("../controllers/cartController");

router.get("/", cartCtr.getCart);

router
    .route("/:carId")
    .patch(cartCtr.reduceFromCart)
    .post(cartCtr.addToCart)
    .delete(cartCtr.removeFromCart)

module.exports = router;
