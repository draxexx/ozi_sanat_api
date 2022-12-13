const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  login,
  getSingleUser,
  updatePassword,
  resetPassword,
  uploadImage,
  updateActive,
} = require("../controllers/user");

router.get("/", getAllUsers);
router.get("/login/:id", getSingleUser);
router.post("/login", login);
router.put("/password/:id", updatePassword);
router.put("/reset/:id", resetPassword);
router.post("/profileimage/:id", uploadImage);
router.put("/setActive/:id", updateActive);

module.exports = router;
