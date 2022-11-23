const express = require("express");
const router = express.Router();

const { getAllHomeworks, createHomework } = require("../controllers/homework");

router.get("/", getAllHomeworks);
router.post("/", createHomework);

module.exports = router;
