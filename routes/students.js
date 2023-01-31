const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getLastStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleStudentCourses,
  getSingleStudentCoursesByTeacher,
  getSingleStudentNotifications,
  createStudent,
  updateStudent,
  createStudentLessons,
  getNonPayingStudents,
  getSingleStudentNonPayings,
} = require("../controllers/student");

router.get("/", getAllStudents);
router.get("/last/:limit", getLastStudents);
router.post("/", createStudent);
router.post("/:id/lessons", createStudentLessons);
router.put("/:id", updateStudent);
router.get("/:id", getSingleStudent);
router.get("/:id/lessons", getSingleStudentLessons);
router.get("/:id/payments", getSingleStudentPayments);
router.get("/:id/courses", getSingleStudentCourses);
router.get("/:id/courses/:teacherId", getSingleStudentCoursesByTeacher);
router.get("/:id/notifications", getSingleStudentNotifications);
router.get("/nonpaying/list", getNonPayingStudents);
router.get("/:id/nonpayings", getSingleStudentNonPayings);

module.exports = router;
