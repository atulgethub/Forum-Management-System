const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Comment = require("../models/Comment");

// Get comments by post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

// Add comment
router.post("/", protect, async (req, res) => {
  const { postId, text } = req.body;
  if (!text || !postId) {
    return res.status(400).json({ message: "Text and postId required" });
  }

  try {
    const comment = await Comment.create({ postId, text, author: req.user._id });
    const populatedComment = await Comment.findById(comment._id).populate("author", "name");
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: "Failed to create comment" });
  }
});

module.exports = router;
