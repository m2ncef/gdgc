const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
router.get("/", (req, res) => {
  res.json("Hello World");
});

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
module.exports = router;
