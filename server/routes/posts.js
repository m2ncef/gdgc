const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");
const auth = require("../middleware/auth");

router.get("/", auth, postsController.getPosts);
router.get("/:id", auth, postsController.getPostById);
router.post("/", auth, postsController.createPost);
router.put("/:id", auth, postsController.updatePost);
router.delete("/:id", auth, postsController.deletePost);

module.exports = router;
