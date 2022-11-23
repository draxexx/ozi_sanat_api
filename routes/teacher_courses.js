const express = require("express");
const router = express.Router();

const {
  getAllTeacherCourses,
  createTeacherCourse,
} = require("../controllers/teacher_course");

const {
  checkExistingTeacherCourse,
} = require("../middlewares/check_existing_teacher_course");

router.get("/", getAllTeacherCourses);
router.post("/", checkExistingTeacherCourse, createTeacherCourse);

module.exports = router;
