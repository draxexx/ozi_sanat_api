const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  login,
  getSingleUser,
  updatePassword,
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/login/:id", getSingleUser);
router.post("/login", login);
router.put("/password/:id", updatePassword);

module.exports = router;
