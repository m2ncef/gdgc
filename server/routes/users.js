const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

const role = require("../middleware/role");
const auth = require("../middleware/auth");

router.get("/", auth, usersController.getUser);
router.put("/profile", auth, usersController.updateProfile);
router.put("/:id", role(["admin", "user"]), usersController.updateUser);
router.delete("/:id", role(["admin"]), usersController.deleteUser);

module.exports = router;
