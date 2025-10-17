const express = require("express");
const router = express.Router();
const {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendsList,
  getPendingRequests,
  getSentRequests,
  cancelFriendRequest,
  getFriendProgress,
} = require("../controllers/friendController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, getFriendsList);
router.get("/requests", authMiddleware, getPendingRequests);
router.get("/sent", authMiddleware, getSentRequests);

router.post("/request/:id", authMiddleware, sendFriendRequest);
router.post("/accept/:id", authMiddleware, acceptFriendRequest);
router.post("/reject/:id", authMiddleware, rejectFriendRequest);
router.post("/cancel/:id", authMiddleware, cancelFriendRequest);

router.get("/progress/:id", authMiddleware, getFriendProgress);

module.exports = router;
