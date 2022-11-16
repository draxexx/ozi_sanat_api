const express = require("express");
const router = express.Router();

const {
  getAllStudentPayments,
  createStudentPayment,
} = require("../controllers/student_payment");

router.get("/", getAllStudentPayments);
router.post("/", createStudentPayment);

module.exports = router;
