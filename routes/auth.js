// import/configure express
const express = require("express");
const router = express.Router();

// import required libraries
const passport = require("passport");

// import event emitter
const { emitter } = require("../services/log");

// root auth route (/auth)
router.get("/", async (req, res) => {
  // log GET request
  emitter.emit(
    "request",
    "request",
    "GET",
    res.statusCode,
    `/auth route (login.ejs) accessed`
  );

  res.render("login");
  return;
});

// root auth route POST (/auth)
router.post("/", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      // log auth event
      emitter.emit(
        "auth",
        "auth",
        "LOGIN",
        "FAILURE",
        `user '${req.body.username}' not found`
      );

      req.session.status = info.message || "Username or password is incorrect.";

      // log POST request failure
      emitter.emit(
        "request",
        "request",
        "POST",
        res.statusCode,
        `/auth route POST failure (${req.session.status})`
      );

      return res.redirect("/auth");
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      // log auth event
      emitter.emit(
        "auth",
        "auth",
        "LOGIN",
        "SUCCESS",
        `user '${user.username}' logged in`
      );

      // log POST request success
      emitter.emit(
        "request",
        "request",
        "POST",
        res.statusCode,
        `/auth route POST success`
      );

      req.session.status = "Happy for your return " + user.username;
      return res.redirect("/search");
    });
  })(req, res, next);
});

// new user registration route (/auth/new)
router.get("/new", async (req, res) => {
  // log GET request
  emitter.emit(
    "request",
    "request",
    "GET",
    res.statusCode,
    `/auth/new route (register.ejs) accessed`
  );

  res.render("register", { status: req.session.status });
  return;
});

// new user registration route POST (/auth/new)
router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/auth",
    failureMessage: "Invalid username or password.",
  }),
  (req, res) => {
    // log auth event
    emitter.emit(
      "auth",
      "auth",
      "LOGIN",
      "SUCCESS",
      `user '${req.user.username}' logged in`
    );

    // log POST request success
    emitter.emit(
      "request",
      "request",
      "POST",
      res.statusCode,
      `/auth route POST success`
    );

    req.session.status = "Happy for your return " + req.user.username;
    res.redirect("/search");
  }
);

// logout route (/auth/exit)
router.get("/exit", (req, res, next) => {
  // Get the username before session is destroyed
  const user = req.user ? req.user.username : "Unknown User";

  req.logout((err) => {
    if (err) {
      // log auth event
      emitter.emit(
        "auth",
        "auth",
        "LOGOUT",
        "FAILURE",
        `could not logout user '${user}'`
      );

      return next(err); // Use next() to handle errors if needed
    }

    // log auth event
    emitter.emit(
      "auth",
      "auth",
      "LOGOUT",
      "SUCCESS",
      `user '${user}' logged out`
    );

    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/exit route accessed`
    );

    // Clear the session cookie
    res.clearCookie("connect.sid");
    res.redirect("/auth");
  });
});

module.exports = router;
