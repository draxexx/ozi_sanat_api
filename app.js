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
const lessons = require("./routes/lessons");
const lessonStudents = require("./routes/lessonStudents");
const homeworks = require("./routes/homeworks");
const studentPayments = require("./routes/studentPayments");
const teacherPayments = require("./routes/teacherPayments");

// middlewares

// routes
app.use("/users", users);
app.use("/courses", courses);
app.use("/branches", branches);
app.use("/branchCourses", branchCourses);
app.use("/teacherCourses", teacherCourses);
app.use("/lessons", lessons);
app.use("/lessonStudents", lessonStudents);
app.use("/homeworks", homeworks);
app.use("/studentPayments", studentPayments);
app.use("/teacherPayments", teacherPayments);

module.exports = app;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
