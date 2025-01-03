const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./utils/db");
const morgan = require("morgan");
const auth = require("./routes/auth");
const users = require("./routes/users");
const posts = require("./routes/posts");
const jobs = require("./routes/jobs");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/users", users);
app.use("/posts", posts);
app.use("/jobs", jobs);
app.listen(3000, () => {
  connectDB().then(() => {
    console.log("Server is running on port 3000");
  });
});
