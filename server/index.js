const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/db");

const auth = require("./routes/auth");
const users = require("./routes/users");

app.use(express.json());
app.use(cors());

app.use("/auth", auth);
app.use("/users", users);

app.listen(3000, () => {
  connectDB().then(() => {
    console.log("Server is running on port 3000");
  });
});
