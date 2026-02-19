const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  email: { 
    type: String, 
    required: [true, 'Email is required'], 
    unique: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' 
  },
}, { timestamps: true });

// ✅ FIXED: Modern Mongoose pre-save (NO next() parameter)
UserSchema.pre('save', async function() {  // ✅ No 'next' parameter
  if (!this.isModified('password')) return;  // ✅ Just return
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error) {
    throw new Error('Password hashing failed');
  }
});

// Password comparison method
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
