const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");
const User = require("../models/User");

// Get all users (admin only)
router.get("/users", protect, admin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports = router;
