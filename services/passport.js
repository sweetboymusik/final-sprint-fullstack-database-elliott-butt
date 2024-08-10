const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

require("dotenv").config();

const { getLoginByUsername, getUserById } = require("./pg.auth.dal");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Fetch user by username
      const user = await getLoginByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }

      // Compare the password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return done(null, false, { message: "Incorrect password." });
      }

      // If everything checks out, return the user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id); // Save the user id in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    // Fetch user by id (assuming you have a function for that)
    const user = await getUserById(id);
    done(null, user); // Attach the user object to req.user
  } catch (err) {
    done(err, null);
  }
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("authorized as heck!");
    return next();
  }

  console.log("not authorized!");
  res.redirect("/auth");
}

module.exports = {
  passport,
  ensureAuthenticated,
};
