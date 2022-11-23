const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  login,
  getSingleUser,
  updatePassword,
  resetPassword,
  uploadImage,
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/login/:id", getSingleUser);
router.post("/login", login);
router.put("/password/:id", updatePassword);
router.put("/reset/:id", resetPassword);
router.post("/profileimage/:id", uploadImage);

module.exports = router;
