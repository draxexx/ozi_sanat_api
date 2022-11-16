const express = require("express");

// routers
const users = require("./users");
const courses = require("./courses");
const lessons = require("./lessons");
const branches = require("./branches");
const branchCourses = require("./branch_courses");

const router = express.Router();

router.use("/users", users);
router.use("/courses", courses);
router.use("/lessons", lessons);
router.use("/branches", branches);
router.use("/branchcourses", branchCourses);

module.exports = router;
