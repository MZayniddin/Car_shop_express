const router = require("express").Router();
const carsController = require("../../controllers/carsController");

router.route("/").get(carsController.getAllCars);

module.exports = router;
