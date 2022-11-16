const express = require("express");
const router = express.Router();

const {
  getAllNotifications,
  createNotification,
} = require("../controllers/notification");

router.get("/", getAllNotifications);
router.post("/", createNotification);

module.exports = router;
