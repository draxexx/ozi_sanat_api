const express = require("express");
const router = express.Router();

const {
  getAllTeachers,
  getLastTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherLessonsGroupByDay,
  getSingleTeacherStudents,
  createTeacher,
  updateTeacher,
} = require("../controllers/teacher");

router.get("/", getAllTeachers);
router.get("/last/:limit", getLastTeachers);
router.post("/", createTeacher);
router.put("/:id", updateTeacher);
router.get("/:id", getSingleTeacher);
router.get("/:id/courses", getSingleTeacherCourses);
router.get("/:id/lessons", getSingleTeacherLessons);
router.get("/:id/lessonsgroupbyday", getSingleTeacherLessonsGroupByDay);
router.get("/:id/students", getSingleTeacherStudents);

module.exports = router;
