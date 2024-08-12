// import/configure express
const express = require("express");
const router = express.Router();

// import required libraries
const passport = require("passport");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

// import required functions
const { addLogin } = require("../services/pg.auth.dal");

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

  // save session status and set to null
  let status = req.session.status;
  req.session.status = null;

  // render page
  res.render("login", { status });
});

// root auth route POST (/auth)
router.post("/", (req, res, next) => {
  // authenticate with passport
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

      // set session status
      req.session.status = info.message || "Username or password is incorrect.";

      // log POST request failure
      emitter.emit(
        "request",
        "request",
        "POST",
        res.statusCode,
        `/auth route POST failure (${req.session.status})`
      );

      // redirect to login page
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

      // redirect to search page
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

  // render register page
  res.render("register", { status: req.session.status });
  return;
});

// new user registration route POST (/auth/new)
router.post("/new", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // make sure all fields are filled
    if (username && email && password) {
      // add new user to db
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await addLogin(username, email, hashedPassword, uuid.v4());

      // after successful registration, log the user in
      req.session.status = "New account created, logging you in...";

      req.logIn(user, (err) => {
        if (err) {
          // render to 503 page
          return res.render("503");
        }
        // redirect to search page
        res.redirect("/search");
      });
    } else {
      // redirect to registration page
      req.session.status = "Not enough form fields completed.";
      res.redirect("/auth/new");
      return;
    }
  } catch (error) {
    // render to 503 page
    res.render("503");
    return;
  }
});

// logout route (/auth/exit)
router.get("/exit", (req, res, next) => {
  // get the username before session is destroyed
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

      return next(err);
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

    // redirect to logout page
    res.redirect("/auth/logout");
  });
});

// root auth route (/auth)
router.get("/logout", async (req, res) => {
  // log GET request
  emitter.emit(
    "request",
    "request",
    "GET",
    res.statusCode,
    `/auth route (logout.ejs) accessed`
  );

  // render logout page
  res.render("logout");
  return;
});

module.exports = router;
