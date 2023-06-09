const router = require("express").Router();
const brandsCtr = require("../../controllers/brandsController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(brandsCtr.getAllBrand)
    .post(verifyRoles(ROLES_LIST.Admin), brandsCtr.createBrand);

router
    .route("/:id")
    .put(verifyRoles(ROLES_LIST.Admin), brandsCtr.updateBrand)
    .delete(verifyRoles(ROLES_LIST.Admin), brandsCtr.deleteBrand);

module.exports = router;
