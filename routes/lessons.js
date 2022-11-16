const express = require("express");
const router = express.Router();

const {
  getAllLessons,
  getSingleLesson,
  createLesson,
} = require("../controllers/lesson");

router.get("/", createLesson);
router.post("/", createLesson);
router.get("/:id", getSingleLesson);

module.exports = router;
