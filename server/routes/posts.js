const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");
const auth = require("../middleware/auth");

router.use(auth);

// Specific routes first
router.get("/saved", postsController.getSavedPosts);
router.post("/", postsController.createPost);
router.get("/", postsController.getPosts);

// Parameter routes after
router.get("/:id", postsController.getPostById);
router.get("/:id/comments", postsController.getComments);
router.post("/:id/comments", postsController.createComment);
router.put("/:id", postsController.updatePost);
router.delete("/:id", postsController.deletePost);
router.post("/:id/save", postsController.savePost);
router.post("/:id/upvote", postsController.upvotePost);
router.post("/:id/downvote", postsController.downvotePost);

module.exports = router;
