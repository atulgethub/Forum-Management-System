const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Post = require("../models/Post");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});

// Create post
router.post("/", protect, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content required" });
  }
  try {
    const post = await Post.create({ title, content, author: req.user._id });
    const populatedPost = await Post.findById(post._id).populate("author", "name");
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
});

module.exports = router;
