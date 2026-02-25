const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

const User = require("../models/User");
const Post = require("../models/Post");


// =========================================================
// 🔥 DASHBOARD STATS
// Endpoint: GET /api/admin/stats
// =========================================================
router.get("/stats", protect, admin, async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();
    const totalPublished = await Post.countDocuments({ isApproved: true });
    const totalPending = await Post.countDocuments({ isApproved: false });
    const totalUsers = await User.countDocuments({ role: "user" });

    const recentPosts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalPosts,
      totalPublished,
      totalPending,
      totalUsers,
      recentPosts,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard" });
  }
});


// =========================================================
// 🔥 GET ALL POSTS (ADMIN)
// Endpoint: GET /api/admin/posts
// =========================================================
router.get("/posts", protect, admin, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts" });
  }
});


// =========================================================
// 🔥 APPROVE / UNAPPROVE POST
// Endpoint: PUT /api/admin/posts/approve/:id
// =========================================================
router.put("/posts/approve/:id", protect, admin, async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.isApproved = !post.isApproved;
    await post.save();

    res.json({
      success: true,
      isApproved: post.isApproved,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to update post" });
  }
});


// =========================================================
// 🔥 DELETE POST
// Endpoint: DELETE /api/admin/posts/:id
// =========================================================
router.delete("/posts/:id", protect, admin, async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();

    res.json({ success: true, message: "Post deleted" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete post" });
  }
});


// =========================================================
// 🔥 USERS MANAGEMENT
// =========================================================

// GET USERS
router.get("/users", protect, admin, async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const search = req.query.search || "";

    const query = {
      role: { $ne: "admin" },
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});


// UPDATE USER
router.put("/users/:id", protect, admin, async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user || user.role === "admin") {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    res.json({ success: true, user });

  } catch (error) {
    res.status(500).json({ message: "Failed to update user" });
  }
});


// DELETE USER
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user || user.role === "admin") {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    res.json({ success: true, message: "User deleted" });

  } catch (error) {
    res.status(500).json({ message: "Failed to delete user" });
  }
});


// BLOCK / UNBLOCK USER
router.put("/users/block/:id", protect, admin, async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user || user.role === "admin") {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      success: true,
      isBlocked: user.isBlocked,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to block user" });
  }
});

module.exports = router;