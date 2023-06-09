const router = require("express").Router();
const usersCtr = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
    .route("/")
    .get(verifyRoles(ROLES_LIST.Admin), usersCtr.getAllUsers)
    .put(usersCtr.updateUser);

router.delete("/:userId", verifyRoles(ROLES_LIST.Admin), usersCtr.deleteUser);

module.exports = router;
