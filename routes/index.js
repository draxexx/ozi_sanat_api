const express = require("express");

// routers
const users = require("./users");
const managers = require("./managers");
const branchManagers = require("./branch_managers");
const teachers = require("./teachers");
const students = require("./students");
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
const branchManages = require("./branch_manage");
const expenses = require("./expenses");

const router = express.Router();

router.use("/users", users);
router.use("/managers", managers);
router.use("/branchmanagers", branchManagers);
router.use("/teachers", teachers);
router.use("/students", students);
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
router.use("/branchmanages", branchManages);
router.use("/expenses", expenses);

module.exports = router;
