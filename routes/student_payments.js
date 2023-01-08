const express = require("express");
const router = express.Router();

const {
  getAllStudentPayments,
  createStudentPayment,
  checkLastLessonOfPayment,
  getAllStudentPaymentsWithStudentInfo,
  update,
  deleteStudentPayment,
} = require("../controllers/student_payment");

router.get("/", getAllStudentPayments);
router.get("/getallpayments", getAllStudentPaymentsWithStudentInfo);
router.post("/", createStudentPayment);
router.put("/:id", update);
router.delete("/:id", deleteStudentPayment);
router.post("/:id/checklastlessonofpayment", checkLastLessonOfPayment);

module.exports = router;
