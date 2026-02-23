const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/admin");

const User = require("../models/User");
const Post = require("../models/Post");


/* =========================================================
   🔥 POSTS MANAGEMENT (ADMIN)
========================================================= */

// 1️⃣ GET ALL POSTS
router.get("/posts", protect, admin, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Get Posts Error:", error);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
});


// 2️⃣ GET SINGLE POST
router.get("/posts/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(id).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Get Single Post Error:", error);
    return res.status(500).json({ message: "Failed to fetch post" });
  }
});


// 3️⃣ APPROVE / UNAPPROVE POST
router.put("/posts/approve/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.isApproved = !post.isApproved;
    await post.save();

    return res.status(200).json({
      success: true,
      isApproved: post.isApproved,
      message: post.isApproved
        ? "Post approved successfully"
        : "Post unpublished successfully",
    });

  } catch (error) {
    console.error("Approve Post Error:", error);
    return res.status(500).json({ message: "Failed to update post" });
  }
});


// 4️⃣ DELETE POST
router.delete("/posts/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });

  } catch (error) {
    console.error("Delete Post Error:", error);
    return res.status(500).json({ message: "Failed to delete post" });
  }
});



/* =========================================================
   🔥 USERS MANAGEMENT (ADMIN)
========================================================= */

// 5️⃣ GET USERS
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

    return res.status(200).json({
      success: true,
      users,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalUsers: total,
    });

  } catch (error) {
    console.error("Get Users Error:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
});


// 6️⃣ UPDATE USER
router.put("/users/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id);

    if (!user || user.role === "admin") {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Update User Error:", error);
    return res.status(500).json({ message: "Failed to update user" });
  }
});


// 7️⃣ DELETE USER
router.delete("/users/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id);

    if (!user || user.role === "admin") {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
});


// 8️⃣ BLOCK / UNBLOCK USER
router.put("/users/block/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id);

    if (!user || user.role === "admin") {
      return res.status(404).json({ message: "User not found" });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({
      success: true,
      isBlocked: user.isBlocked,
      message: user.isBlocked
        ? "User blocked successfully"
        : "User unblocked successfully",
    });

  } catch (error) {
    console.error("Block User Error:", error);
    return res.status(500).json({ message: "Failed to block user" });
  }
});

module.exports = router;