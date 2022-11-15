const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/user");
const { getAllManagers } = require("../controllers/manager");
const { getAllBranchManagers } = require("../controllers/branch_manager");
const {
  getAllTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherStudents,
} = require("../controllers/teacher");
const {
  getAllStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleStudentCourses,
  getSingleStudentNotifications,
} = require("../controllers/student");

router.get("/", getAllUsers);
router.get("/managers", getAllManagers);
router.get("/branchmanagers", getAllBranchManagers);
router.get("/teachers", getAllTeachers);
router.get("/teachers/:id", getSingleTeacher);
router.get("/teachers/:id/courses", getSingleTeacherCourses);
router.get("/teachers/:id/lessons", getSingleTeacherLessons);
router.get("/teachers/:id/students", getSingleTeacherStudents);
router.get("/students", getAllStudents);
router.get("/students/:id", getSingleStudent);
router.get("/students/:id/lessons", getSingleStudentLessons);
router.get("/students/:id/payments", getSingleStudentPayments);
router.get("/students/:id/courses", getSingleStudentCourses);
router.get("/students/:id/notifications", getSingleStudentNotifications);

module.exports = router;
