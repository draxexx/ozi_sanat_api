const express = require("express");
const router = express.Router();

const {
  getAllBranchManagers,
  createBranchManager,
  updateBranchManager,
} = require("../controllers/branch_manager");

router.get("/", getAllBranchManagers);
router.post("/", createBranchManager);
router.put("/:id", updateBranchManager);

module.exports = router;
