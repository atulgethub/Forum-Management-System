const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Comment = require("../models/Comment");

// ➜ CREATE COMMENT
router.post("/", protect, async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment cannot be empty" });
    }

    const comment = await Comment.create({
      postId,
      text,
      author: req.user._id,
    });

    const populated = await comment.populate("author", "name email");

    res.status(201).json(populated);

  } catch (err) {
    res.status(500).json({ message: "Failed to add comment" });
  }
});


// ➜ GET COMMENTS BY POST
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(comments);

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
});

module.exports = router;