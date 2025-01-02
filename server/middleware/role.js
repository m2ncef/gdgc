const User = require("../models/User");

const role = (roles) => async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (roles.includes(user.role)) {
    next();
  } else {
    res.status(401).json({
      message: `Unauthorized, only ${
        roles.length > 1 ? roles.join(", ") : roles
      } can access this route`,
    });
  }
};

module.exports = role;
