require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/db");

const app = express();

// =============================
// 🔥 CONNECT DATABASE
// =============================
connectDB();

// =============================
// 🔥 CORS
// =============================
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    credentials: true,
  })
);

// =============================
// 🔥 BODY PARSER
// =============================
app.use(express.json({ limit: "10mb" }));

// =============================
// 🔥 REGISTER PASSPORT STRATEGIES
// (VERY IMPORTANT)
// =============================
require("./config/passport-local")(passport);
require("./config/passport-jwt");

// Initialize passport
app.use(passport.initialize());


// =============================
// 🔥 ROUTES
// =============================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/admin", require("./routes/adminRoutes"));


// =============================
// 🔥 HEALTH CHECK
// =============================
app.get("/", (req, res) => {
  res.json({ message: "🚀 API is running..." });
});


// =============================
// 🔥 ERROR HANDLER
// =============================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
  });
});


// =============================
// 🔥 START SERVER
// =============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});