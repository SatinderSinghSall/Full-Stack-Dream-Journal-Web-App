const express = require("express");
const {
  createDream,
  getDreams,
  getDream,
  updateDream,
  deleteDream,
} = require("../controllers/dreamController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware); // all routes below are protected

router.post("/", createDream);
router.get("/", getDreams);
router.get("/:id", getDream);
router.put("/:id", updateDream);
router.delete("/:id", deleteDream);

module.exports = router;
