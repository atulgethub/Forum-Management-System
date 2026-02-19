const router = require("express").Router();
const Comment = require("../models/Comment");

// Create Comment
router.post("/", async (req, res) => {
  try {
    const { postId, text, author } = req.body;

    if (!author) return res.status(400).json({ message: "Author is required" });
    if (!text) return res.status(400).json({ message: "Comment text required" });

    const comment = await Comment.create({ postId, author, text });

    // Populate author before sending
    const populatedComment = await comment.populate("author", "name email"); 
    res.status(201).json(populatedComment);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add comment", error: err });
  }
});

// Get comments for a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .populate("author", "name email") // populate author info
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch comments", error: err });
  }
});

module.exports = router;
