const express = require("express");
const router = express.Router();

const {
  getAllBranches,
  createBranch,
  getAllBranchCourses,
} = require("../controllers/branch");

router.get("/", getAllBranches);
router.get("/:id/courses", getAllBranchCourses);
router.post("/", createBranch);

module.exports = router;
