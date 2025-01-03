const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

class PostsController {
  async getPosts(req, res) {
    const posts = await Post.find().populate("userId", "name");
    res.json(posts);
  }

  async getPostById(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id).populate("userId", "name");
    res.json(post);
  }

  async createPost(req, res) {
    const { title, content, userId } = req.body;
    const post = await Post.create({ title, content, userId });
    res.json(post);
  }

  async updatePost(req, res) {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const post = await Post.findByIdAndUpdate(id, { title, content, author });
    res.json(post);
  }

  async deletePost(req, res) {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted" });
  }

  async getCommentsByPostId(req, res) {
    const { id } = req.params;
    const comments = await Comment.find({ postId: id });
    res.json(comments);
  }

  async createComment(req, res) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const comment = await Comment.create({
        content,
        postId: id,
        userId: req.user.userId,
      });
      const populatedComment = await comment.populate("userId", "name avatar");
      res.json(populatedComment);
    } catch (error) {
      console.error("Failed to create comment:", error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  }

  async getComments(req, res) {
    try {
      const { id } = req.params;
      const comments = await Comment.find({ postId: id }).populate(
        "userId",
        "name avatar"
      );
      res.json(comments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  }

  async upvotePost(req, res) {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, { likes: 1 });
    res.json(post);
  }

  async downvotePost(req, res) {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, { likes: -1 });
    res.json(post);
  }

  async savePost(req, res) {
    const { id } = req.params;
    const user = await User.findById(req.user.userId);
    user.savedPosts.push(id);
    await user.save();
    res.json(user);
  }

  async getSavedPosts(req, res) {
    try {
      const user = await User.findById(req.user.userId);
      const posts = user.savedPosts;
      const savedPosts = await Post.find({ _id: { $in: posts } })
        .populate("userId", "name")
        .sort({ postedAt: -1 });
      res.json(savedPosts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch saved posts" });
    }
  }
}

module.exports = new PostsController();
