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
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Get current vote status
      const currentVoteStatus = {
        hasUpvoted: post.upvotes.includes(userId),
        hasDownvoted: post.downvotes.includes(userId),
      };

      let voteResult = {
        likes: post.likes,
        userVote: null,
        reputationChange: 0,
      };

      // Handle upvote logic
      if (currentVoteStatus.hasUpvoted) {
        // Remove upvote
        post.upvotes = post.upvotes.filter((id) => id.toString() !== userId);
        voteResult.likes = post.likes - 1;
        voteResult.reputationChange = -1;
      } else {
        // Add upvote
        if (currentVoteStatus.hasDownvoted) {
          // Remove existing downvote first
          post.downvotes = post.downvotes.filter(
            (id) => id.toString() !== userId
          );
          voteResult.likes = post.likes + 2; // +2 because removing downvote (+1) and adding upvote (+1)
          voteResult.reputationChange = 2;
        } else {
          voteResult.likes = post.likes + 1;
          voteResult.reputationChange = 1;
        }
        post.upvotes.push(userId);
        voteResult.userVote = "up";
      }

      // Update post
      post.likes = voteResult.likes;
      await post.save();

      // Update user reputation if needed
      if (voteResult.reputationChange !== 0) {
        await User.findByIdAndUpdate(
          post.userId,
          { $inc: { reputation: voteResult.reputationChange } },
          { new: true }
        );
      }

      res.json({
        likes: voteResult.likes,
        userVote: voteResult.userVote,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error processing upvote",
        error: error.message,
      });
    }
  }

  async downvotePost(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Get current vote status
      const currentVoteStatus = {
        hasUpvoted: post.upvotes.includes(userId),
        hasDownvoted: post.downvotes.includes(userId),
      };

      let voteResult = {
        likes: post.likes,
        userVote: null,
        reputationChange: 0,
      };

      // Handle downvote logic
      if (currentVoteStatus.hasDownvoted) {
        // Remove downvote
        post.downvotes = post.downvotes.filter(
          (id) => id.toString() !== userId
        );
        voteResult.likes = post.likes + 1;
        voteResult.reputationChange = 1;
      } else {
        // Add downvote
        if (currentVoteStatus.hasUpvoted) {
          // Remove existing upvote first
          post.upvotes = post.upvotes.filter((id) => id.toString() !== userId);
          voteResult.likes = post.likes - 2; // -2 because removing upvote (-1) and adding downvote (-1)
          voteResult.reputationChange = -2;
        } else {
          voteResult.likes = post.likes - 1;
          voteResult.reputationChange = -1;
        }
        post.downvotes.push(userId);
        voteResult.userVote = "down";
      }

      // Update post
      post.likes = voteResult.likes;
      await post.save();

      // Update user reputation if needed
      if (voteResult.reputationChange !== 0) {
        await User.findByIdAndUpdate(
          post.userId,
          { $inc: { reputation: voteResult.reputationChange } },
          { new: true }
        );
      }

      res.json({
        likes: voteResult.likes,
        userVote: voteResult.userVote,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error processing downvote",
        error: error.message,
      });
    }
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

  async getOtherUsersPosts(req, res) {
    try {
      const posts = await Post.find({ userId: { $ne: req.user.userId } })
        .populate("userId", "name")
        .sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching other users' posts",
        error: error.message,
      });
    }
  }

  async getMyPosts(req, res) {
    try {
      const posts = await Post.find({ userId: req.user.userId })
        .populate("userId", "name")
        .sort({ createdAt: -1 });
      res.json(posts);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching your posts",
        error: error.message,
      });
    }
  }
}

module.exports = new PostsController();
