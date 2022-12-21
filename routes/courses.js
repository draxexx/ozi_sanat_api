const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  createCourse,
  updateCourse,
  getAllCourseTeachers,
  getSingleCourse,
} = require("../controllers/course");

router.get("/", getAllCourses);
router.get("/:id", getSingleCourse);
router.get("/:id/teachers", getAllCourseTeachers);
router.post("/", createCourse);
router.put("/:id", updateCourse);

module.exports = router;
