const router = require("express").Router();
const carsController = require("../../controllers/carsController");

router.route("/").get(carsController.getAllCars).post(carsController.createCar);
router
    .route("/:id")
    .put(carsController.updateCar)
    .delete(carsController.deleteCar);

module.exports = router;
