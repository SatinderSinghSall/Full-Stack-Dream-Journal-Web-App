const express = require("express");
const {
  loginAdmin,
  createAdmin,
  getDashboardStats,
  getAllUsers,
  getAllDreams,
} = require("../controllers/adminController");
const { adminAuthMiddleware } = require("../middleware/authMiddleware"); // ✅ FIXED

const router = express.Router();

// Admin Auth
router.post("/login", loginAdmin);
router.post("/register", createAdmin);

// Protected admin routes
router.get("/dashboard", adminAuthMiddleware, getDashboardStats);
router.get("/users", adminAuthMiddleware, getAllUsers);
router.get("/dreams", adminAuthMiddleware, getAllDreams);

module.exports = router;
