const express = require("express");

// routers
const users = require("./users");
const courses = require("./courses");
const lessons = require("./lessons");

const router = express.Router();

router.use("/users", users);
router.use("/courses", courses);
router.use("/lessons", lessons);

module.exports = router;
