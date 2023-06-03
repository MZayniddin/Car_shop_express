const router = require("express").Router();
const brandsCtr = require("../../controllers/brandsController");

router.route("/").get(brandsCtr.getAllBrand).post(brandsCtr.createBrand);
router.route("/:id").put(brandsCtr.updateBrand).delete(brandsCtr.deleteBrand);

module.exports = router;
