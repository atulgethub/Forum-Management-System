// routes/comment.js
const router = require("express").Router();
const Comment = require("../models/Comment");

// Create Comment
router.post("/", async (req, res) => {
  try {
    const { postId, text, author } = req.body;

    if (!author) return res.status(400).json({ message: "Author is required" });
    if (!text) return res.status(400).json({ message: "Comment text required" });

    const comment = await Comment.create({ postId, author, text });
    res.status(201).json(comment);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to add comment", error: err });
  }
});

module.exports = router;
