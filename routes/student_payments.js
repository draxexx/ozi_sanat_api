const express = require("express");
const router = express.Router();

const {
  getAllStudentPayments,
  createStudentPayment,
  checkLastLessonOfPayment,
  getAllStudentPaymentsWithStudentInfo,
} = require("../controllers/student_payment");

router.get("/", getAllStudentPayments);
router.get("/getallpayments", getAllStudentPaymentsWithStudentInfo);
router.post("/", createStudentPayment);
router.post("/:id/checklastlessonofpayment", checkLastLessonOfPayment);

module.exports = router;
