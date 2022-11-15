const express = require("express");
const router = express.Router();

const { getAllLessons, getSingleLesson } = require("../controllers/lesson");

router.get("/", getAllLessons);
router.get("/:id", getSingleLesson);

module.exports = router;
