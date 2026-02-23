const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const Post = require("../models/Post");


// =====================================================
// 🔥 GET MY POSTS (ONLY LOGGED-IN USER)
// =====================================================
router.get("/my", protect, async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id,   // 👈 ONLY THIS USER
    })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch your posts" });
  }
});


// =====================================================
// 🔥 GET ALL APPROVED POSTS (PUBLIC)
// =====================================================
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ isApproved: true })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});


// =====================================================
// 🔥 CREATE POST (DEFAULT = PENDING)
// =====================================================
router.post("/", protect, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content required",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      isApproved: false, // 👈 IMPORTANT
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to create post" });
  }
});


// =====================================================
// 🔥 GET SINGLE APPROVED POST ONLY
// =====================================================
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      isApproved: true,  // 👈 Only published
    }).populate("author", "name email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found or not published",
      });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

module.exports = router;