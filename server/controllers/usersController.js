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
    const user = await User.findByIdAndUpdate(id, { name, email, password });
    res.json(user);
  }

  async deleteUser(req, res) {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.json(user);
  }
}

module.exports = new UserController();
