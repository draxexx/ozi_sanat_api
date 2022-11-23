const express = require("express");
const router = express.Router();

const {
  getAllTeacherPayments,
  createTeacherPayment,
} = require("../controllers/teacher_payment");

router.get("/", getAllTeacherPayments);
router.post("/", createTeacherPayment);

module.exports = router;
