const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  createCourse,
  getAllCourseTeachers,
} = require("../controllers/course");

router.get("/", getAllCourses);
router.get("/:id/teachers", getAllCourseTeachers);
router.post("/", createCourse);

module.exports = router;
