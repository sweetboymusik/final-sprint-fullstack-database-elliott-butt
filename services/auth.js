const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const token = req.session.token;

  if (!token) {
    return res.redirect("/auth");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.redirect("/auth");
    }

    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken,
};
