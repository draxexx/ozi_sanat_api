const express = require("express");
const router = express.Router();

const { getAll, create, deleteExpense } = require("../controllers/expense");

router.get("/", getAll);
router.post("/", create);
router.delete("/:id", deleteExpense);

module.exports = router;
