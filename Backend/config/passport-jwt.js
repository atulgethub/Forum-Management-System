const passport = require("passport");

require("./passport-local")(passport);
require("./passport-jwt");

module.exports = passport;