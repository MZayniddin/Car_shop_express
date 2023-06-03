const router = require("express").Router();
const brandsCtr = require("../../controllers/brandsController");

router.route("/").get(brandsCtr.getAllBrand);

module.exports = router;
