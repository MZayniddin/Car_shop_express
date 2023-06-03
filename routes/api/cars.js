const router = require("express").Router();
const carsController = require("../../controllers/carsController");

router.get("/list", carsController.getAllCars);

module.exports = router;
