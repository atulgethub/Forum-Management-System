const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: [true, 'Comment text is required'],
    trim: true,
    maxlength: 500
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
