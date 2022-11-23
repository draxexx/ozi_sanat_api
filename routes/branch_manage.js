const express = require("express");
const router = express.Router();

const {
  getAllBranchManages,
  getBranchStudents,
} = require("../controllers/branch_manage");

router.get("/", getAllBranchManages);
router.get("/:id/students", getBranchStudents);

module.exports = router;
