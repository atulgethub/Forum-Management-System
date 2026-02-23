const passport = require("passport");
require("./passport-local")(passport);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const User = require("../models/User");
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;