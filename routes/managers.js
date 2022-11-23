const express = require("express");
const router = express.Router();

const {
  getAllManagers,
  createManager,
  updateManager,
} = require("../controllers/manager");

router.get("/", getAllManagers);
router.post("/", createManager);
router.put("/:id", updateManager);

module.exports = router;
