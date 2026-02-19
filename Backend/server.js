require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");

// Import passport configs
require("./config/passport-local")(passport);
require("./config/passport-jwt");

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json({ limit: "10mb" }));

// Passport middleware (NO SESSION NEEDED for JWT)
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
