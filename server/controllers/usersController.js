const User = require("../models/User");

class UserController {
  async getUsers(req, res) {
    const users = await User.find();
    res.json(users);
  }

  async getUserById(req, res) {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
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
