const express = require("express");
const router = express.Router();

const { getAllBranches, createBranch } = require("../controllers/branch");

router.get("/", getAllBranches);
router.post("/", createBranch);

module.exports = router;
