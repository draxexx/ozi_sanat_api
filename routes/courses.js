const express = require("express");
const router = express.Router();

const { getAllCourses, createCourse } = require("../controllers/course");

router.get("/", getAllCourses);
router.post("/", createCourse);

module.exports = router;
