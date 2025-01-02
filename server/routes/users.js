const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

const role = require("../middleware/role");

router.get("/", role(["admin"]), usersController.getUsers);
router.get("/:id", role(["admin"]), usersController.getUserById);
router.put("/:id", role(["admin"]), usersController.updateUser);
router.delete("/:id", role(["admin"]), usersController.deleteUser);

module.exports = router;
