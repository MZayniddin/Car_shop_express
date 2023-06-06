const router = require("express").Router();
const ROLES_LIST = require("../../config/roles_list");
const carsController = require("../../controllers/carsController");
const verifyRoles = require("../../middleware/verifyRoles");

router.route("/").get(carsController.getAllCars).post(carsController.createCar);
router
    .route("/:id")
    .put(verifyRoles(ROLES_LIST.Admin), carsController.updateCar)
    .delete(verifyRoles(ROLES_LIST.Admin), carsController.deleteCar);

module.exports = router;
