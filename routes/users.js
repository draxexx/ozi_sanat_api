const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllManagers,
  getAllBranchManagers,
  getAllTeachers,
  getAllStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleStudentCourses,
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/managers", getAllManagers);
router.get("/branchmanagers", getAllBranchManagers);
router.get("/teachers", getAllTeachers);
router.get("/teachers/:id", getSingleTeacher);
router.get("/teachers/:id/courses", getSingleTeacherCourses);
router.get("/teachers/:id/lessons", getSingleTeacherLessons);
router.get("/students", getAllStudents);
router.get("/students/:id", getSingleStudent);
router.get("/students/:id/lessons", getSingleStudentLessons);
router.get("/students/:id/payments", getSingleStudentPayments);
router.get("/students/:id/courses", getSingleStudentCourses);

module.exports = router;
