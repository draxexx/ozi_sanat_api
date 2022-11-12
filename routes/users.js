const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getAllManagers,
  getAllBranchManagers,
  getAllStudents,
  getAllTeachers,
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/managers", getAllManagers);
router.get("/branchmanagers", getAllBranchManagers);
router.get("/teachers", getAllTeachers);
router.get("/students", getAllStudents);

module.exports = router;
