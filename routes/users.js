const express = require("express");
const router = express.Router();

const { getAllUsers } = require("../controllers/user");
const { getAllManagers, createManager } = require("../controllers/manager");
const {
  getAllBranchManagers,
  createBranchManager,
} = require("../controllers/branch_manager");
const {
  getAllTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherStudents,
  createTeacher,
} = require("../controllers/teacher");
const {
  getAllStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleStudentCourses,
  getSingleStudentNotifications,
  createStudent,
} = require("../controllers/student");

router.get("/", getAllUsers);
router.get("/managers", getAllManagers);
router.post("/managers", createManager);

router.get("/branchmanagers", getAllBranchManagers);
router.post("/branchmanagers", createBranchManager);

router.get("/teachers", getAllTeachers);
router.post("/teachers", createTeacher);
router.get("/teachers/:id", getSingleTeacher);
router.get("/teachers/:id/courses", getSingleTeacherCourses);
router.get("/teachers/:id/lessons", getSingleTeacherLessons);
router.get("/teachers/:id/students", getSingleTeacherStudents);

router.get("/students", getAllStudents);
router.post("/students", createStudent);
router.get("/students/:id", getSingleStudent);
router.get("/students/:id/lessons", getSingleStudentLessons);
router.get("/students/:id/payments", getSingleStudentPayments);
router.get("/students/:id/courses", getSingleStudentCourses);
router.get("/students/:id/notifications", getSingleStudentNotifications);

module.exports = router;
