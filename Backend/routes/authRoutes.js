const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const passport = require('passport'); // For login

// ==================
// REGISTER (with role support)
// ==================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Default role is 'user' if not provided
    const userRole = role && role === 'admin' ? 'admin' : 'user';

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Create user
    const user = new User({ name, email, password, role: userRole });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

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
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// ==================
// LOGIN (Passport used correctly)
// ==================
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Login error', error: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: info?.message || 'Invalid credentials' });
    }

    // Generate JWT token including role
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

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
// GET CURRENT USER
// ==================
router.get('/me', (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
