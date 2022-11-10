const express = require("express");
const app = express();
const dotenv = require("dotenv");
const port = 3000;

dotenv.config();

app.use(express.json());

// routes
const users = require("./routes/users");
const courses = require("./routes/courses");
const branches = require("./routes/branches");
const branchCourses = require("./routes/branchCourses");
const teacherCourses = require("./routes/teacherCourses");

// middlewares

// routes
app.use("/users", users);
app.use("/courses", courses);
app.use("/branches", branches);
app.use("/branchCourses", branchCourses);
app.use("/teacherCourses", teacherCourses);

module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
