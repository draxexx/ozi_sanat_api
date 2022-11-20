const express = require("express");
const router = express.Router();

const {
  getAllLessonStudents,
  createLessonStudent,
  updateStudentStatus,
} = require("../controllers/lesson_student");

router.get("/", getAllLessonStudents);
router.post("/", createLessonStudent);
router.put("/status/:id", updateStudentStatus);

module.exports = router;
