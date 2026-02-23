const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { protect } = require('../middleware/authMiddleware');


// ==================
// REGISTER (SECURE VERSION)
// ==================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 🚫 DO NOT allow role from frontend
    // Always default to 'user'
    const userRole = 'user';

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({
      name,
      email,
      password,
      role: userRole
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});


// ==================
// LOGIN
// ==================
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, async (err, user, info) => {

    if (err) {
      return res.status(500).json({ message: 'Login error', error: err.message });
    }

    if (!user) {
      return res.status(400).json({ message: info?.message || 'Invalid credentials' });
    }

    // 🚫 Prevent blocked users from login
    if (user.isBlocked) {
      return res.status(403).json({ message: 'Your account has been blocked by admin' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  })(req, res, next);
});


// ==================
// GET CURRENT USER (Protected Route)
// ==================
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;