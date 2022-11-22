const express = require("express");
const router = express.Router();

const {
  getAllBranches,
  createBranch,
  getAllBranchCourses,
  getBranchStudents,
} = require("../controllers/branch");

router.get("/", getAllBranches);
router.get("/:id/students", getBranchStudents);
router.get("/:id/courses", getAllBranchCourses);
router.post("/", createBranch);

module.exports = router;
