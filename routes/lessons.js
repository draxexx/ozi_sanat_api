const express = require("express");
const router = express.Router();

const {
  getAllLessons,
  getSingleLesson,
  createLesson,
  completeLesson,
  updateDate,
} = require("../controllers/lesson");

router.get("/", getAllLessons);
router.post("/", createLesson);
router.get("/:id", getSingleLesson);
router.put("/complete/:id", completeLesson);
router.put("/date/:id", updateDate);

module.exports = router;
