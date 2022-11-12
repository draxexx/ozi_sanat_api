const express = require("express");
const router = express.Router();

const { getAllLessons } = require("../controllers/lesson");

router.get("/", getAllLessons);

module.exports = router;
