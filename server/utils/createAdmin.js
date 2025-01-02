const User = require("../models/User");

const createAdmin = async () => {
  const admin = new User({
    name: "Admin",
    email: "admin@gmail.com",
    password: "admin",
    role: "admin",
  });

  await admin.save();

  console.log("Account Create Successfully");
};

createAdmin();
