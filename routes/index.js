const express = require("express");

// routers
const users = require("./users");
const courses = require("./courses");
const lessons = require("./lessons");
const studentPayments = require("./studentPayments");

const router = express.Router();

router.use("/users", users);
router.use("/courses", courses);
router.use("/lessons", lessons);
router.use("/studentPayments", studentPayments);

module.exports = router;
