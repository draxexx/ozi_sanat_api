const express = require("express");
const router = express.Router();

const {
  getAllBranchManages,
  getBranchStudents,
  getBranchByTeacher,
} = require("../controllers/branch_manage");

router.get("/", getAllBranchManages);
router.get("/branches/:teacherId", getBranchByTeacher);
router.get("/:id/students", getBranchStudents);

module.exports = router;
