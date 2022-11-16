const express = require("express");
const router = express.Router();

const {
  getAllBranchCourses,
  createBranchCourse,
} = require("../controllers/branch_course");

const {
  checkExistingBranchCourse,
} = require("../middlewares/check_existing_branch_course");

router.get("/", getAllBranchCourses);
router.post("/", checkExistingBranchCourse, createBranchCourse);

module.exports = router;
