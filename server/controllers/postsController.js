const Post = require("../models/Post");

class PostsController {
  async getPosts(req, res) {
    const posts = await Post.find();
    res.json(posts);
  }

  async getPostById(req, res) {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.json(post);
  }

  async createPost(req, res) {
    const { title, content, author } = req.body;
    const post = await Post.create({ title, content, author });
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
}

module.exports = new PostsController();
