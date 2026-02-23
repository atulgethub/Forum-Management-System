const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔥 ADD THIS FIELD
    isApproved: {
      type: Boolean,
      default: false, // new posts = pending
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);