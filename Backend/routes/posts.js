const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const Post = require("../models/Post");
const Comment = require("../models/Comment");


// =====================================================
// 🔥 USER DASHBOARD STATS
// GET /api/posts/user/stats
// =====================================================
router.get("/user/stats", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    const totalPosts = await Post.countDocuments({ author: userId });

    const totalPublished = await Post.countDocuments({
      author: userId,
      isApproved: true,
    });

    const totalPending = await Post.countDocuments({
      author: userId,
      isApproved: false,
    });

    const totalComments = await Comment.countDocuments({
      author: userId,
    });

    const recentPosts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("author", "name email");

    res.json({
      totalPosts,
      totalPublished,
      totalPending,
      totalComments,
      recentPosts,
    });

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({ message: "Failed to fetch stats" });
  }
});


// =====================================================
// 🔥 GET MY POSTS
// GET /api/posts/my
// =====================================================
router.get("/my", protect, async (req, res) => {
  try {
    const posts = await Post.find({
      author: req.user._id,
    })
      .populate("author", "name email") // 🔥 include email
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    console.error("My posts error:", err);
    res.status(500).json({ message: "Failed to fetch your posts" });
  }
});


// =====================================================
// 🔥 GET ALL APPROVED POSTS (PUBLIC)
// GET /api/posts
// =====================================================
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ isApproved: true })
      .populate("author", "name email") // 🔥 include email
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    console.error("Fetch posts error:", err);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});


// =====================================================
// 🔥 CREATE POST (DEFAULT = PENDING)
// POST /api/posts
// =====================================================
router.post("/", protect, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
      isApproved: false,
    });

    res.status(201).json(post);

  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
});


// =====================================================
// 🔥 GET SINGLE APPROVED POST
// GET /api/posts/:id
// =====================================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ prevent crash if invalid id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findOne({
      _id: id,
      isApproved: true,
    }).populate("author", "name email"); // 🔥 MUST include email

    if (!post) {
      return res.status(404).json({
        message: "Post not found or not published",
      });
    }

    res.json(post);

  } catch (err) {
    console.error("Single post error:", err);
    res.status(500).json({ message: "Failed to fetch post" });
  }
});


module.exports = router;