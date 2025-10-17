const express = require("express");
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  findUserByEmail,
} = require("../controllers/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.get("/findByEmail/:email", authMiddleware, findUserByEmail);

module.exports = router;
