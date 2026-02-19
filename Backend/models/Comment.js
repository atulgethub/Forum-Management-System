// models/Comment.js
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 must have author
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
