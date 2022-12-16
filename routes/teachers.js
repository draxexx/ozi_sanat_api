const express = require("express");
const router = express.Router();

const {
  getAllTeachers,
  getLastTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherStudents,
  createTeacher,
  updateTeacher,
} = require("../controllers/teacher");

router.get("/", getAllTeachers);
router.get("/:limit", getLastTeachers);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.get("/:id", getSingleTeacher);
router.get("/:id/courses", getSingleTeacherCourses);
router.get("/:id/lessons", getSingleTeacherLessons);
router.get("/:id/students", getSingleTeacherStudents);

module.exports = router;
