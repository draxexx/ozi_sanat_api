const express = require("express");
const router = express.Router();

const {
  getAllLessonStudents,
  createLessonStudent,
} = require("../controllers/lesson_student");

router.get("/", getAllLessonStudents);
router.post("/", createLessonStudent);

module.exports = router;
