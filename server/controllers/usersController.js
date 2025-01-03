const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

class UserController {
  async getUsers(req, res) {
    const users = await User.find();
    res.json(users);
  }

  async getUser(req, res) {
    try {
      const userId = req.user.userId;

      // Get user with basic info
      const user = await User.findById(userId).select("-password");

      // Get user stats
      const stats = {
        postsCount: await Post.countDocuments({ userId }),
        commentsCount: await Comment.countDocuments({ userId }),
        savedCount: user.savedPosts.length,
        reputation: user.reputation || 0,
        votesReceived: await Post.aggregate([
          { $match: { userId: userId } },
          {
            $project: {
              votes: { $size: "$upvotes" },
              downvotes: { $size: "$downvotes" },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum: { $subtract: ["$votes", "$downvotes"] },
              },
            },
          },
        ]).then((result) => result[0]?.total || 0),
        votesGiven: await Post.aggregate([
          {
            $match: {
              $or: [{ upvotes: userId }, { downvotes: userId }],
            },
          },
          { $count: "total" },
        ]).then((result) => result[0]?.total || 0),
      };

      res.json({
        ...user.toObject(),
        stats,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching user data",
        error: error.message,
      });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
    });
    res.json(user);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  }

  async updateProfile(req, res) {
    try {
      const userId = req.user.userId;
      const { name, email } = req.body;

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, email },
        { new: true, select: "-password" }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating profile", error: error.message });
    }
  }
}

module.exports = new UserController();
