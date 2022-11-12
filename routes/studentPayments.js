const express = require("express");
const router = express.Router();

const { getStudentPayments } = require("../controllers/studentPayment");

router.get("/:studentId", getStudentPayments);

module.exports = router;
