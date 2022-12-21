const express = require("express");
const router = express.Router();

const {
  getAllNotifications,
  createNotification,
  getUserNotifications,
} = require("../controllers/notification");

router.get("/", getAllNotifications);
router.get("/:id", getUserNotifications);
router.post("/", createNotification);

module.exports = router;
