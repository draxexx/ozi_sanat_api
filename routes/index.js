const express = require("express");

// routers
const users = require("./users");
const courses = require("./courses");
const lessons = require("./lessons");
const branches = require("./branches");
const branchCourses = require("./branch_courses");
const teacherCourses = require("./teacher_courses");
const studentPayments = require("./student_payments");
const lessonStudents = require("./lesson_student");
const homeworks = require("./homeworks");
const teacherPayments = require("./teacher_payments");
const notifications = require("./notifications");

const router = express.Router();

router.use("/users", users);
router.use("/courses", courses);
router.use("/lessons", lessons);
router.use("/branches", branches);
router.use("/branchcourses", branchCourses);
router.use("/teachercourses", teacherCourses);
router.use("/studentpayments", studentPayments);
router.use("/lessonstudents", lessonStudents);
router.use("/homeworks", homeworks);
router.use("/teacherpayments", teacherPayments);
router.use("/notifications", notifications);

module.exports = router;
