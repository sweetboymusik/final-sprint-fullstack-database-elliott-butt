const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

require("dotenv").config();

const { getLoginByUsername, getUserById } = require("./pg.auth.dal");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // fetch user by username
      const user = await getLoginByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // compare the password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      // if everything checks out, return the user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// required passport functions
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// esure user is logged in middleware function
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/auth");
}

module.exports = {
  passport,
  ensureAuthenticated,
};
