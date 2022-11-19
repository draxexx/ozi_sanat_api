const express = require("express");
const router = express.Router();

const { getAllUsers, login } = require("../controllers/user");
const {
  getAllManagers,
  createManager,
  updateManager,
} = require("../controllers/manager");
const {
  getAllBranchManagers,
  createBranchManager,
  updateBranchManager,
} = require("../controllers/branch_manager");
const {
  getAllTeachers,
  getSingleTeacher,
  getSingleTeacherCourses,
  getSingleTeacherLessons,
  getSingleTeacherStudents,
  createTeacher,
  updateTeacher,
} = require("../controllers/teacher");
const {
  getAllStudents,
  getSingleStudent,
  getSingleStudentLessons,
  getSingleStudentPayments,
  getSingleStudentCourses,
  getSingleStudentNotifications,
  createStudent,
  updateStudent,
  createStudentLessons,
} = require("../controllers/student");

router.get("/", getAllUsers);
router.post("/login", login);

router.get("/managers", getAllManagers);
router.post("/managers", createManager);
router.put("/managers/:id", updateManager);

router.get("/branchmanagers", getAllBranchManagers);
router.post("/branchmanagers", createBranchManager);
router.put("/branchmanagers/:id", updateBranchManager);

router.get("/teachers", getAllTeachers);
router.post("/teachers", createTeacher);
router.put("/teachers/:id", updateTeacher);
router.get("/teachers/:id", getSingleTeacher);
router.get("/teachers/:id/courses", getSingleTeacherCourses);
router.get("/teachers/:id/lessons", getSingleTeacherLessons);
router.get("/teachers/:id/students", getSingleTeacherStudents);

router.get("/students", getAllStudents);
router.post("/students", createStudent);
router.post("/students/:id/lessons", createStudentLessons);
router.put("/students/:id", updateStudent);
router.get("/students/:id", getSingleStudent);
router.get("/students/:id/lessons", getSingleStudentLessons);
router.get("/students/:id/payments", getSingleStudentPayments);
router.get("/students/:id/courses", getSingleStudentCourses);
router.get("/students/:id/notifications", getSingleStudentNotifications);

module.exports = router;
