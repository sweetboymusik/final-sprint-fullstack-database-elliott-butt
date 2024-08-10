// import/configure express
const express = require("express");
const router = express.Router();

// import required libraries
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");

// import required auth functions
const { addLogin, getLoginByUsername } = require("../services/pg.auth.dal");

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
router.post("/", async (req, res) => {
  try {
    let user = await getLoginByUsername(req.body.username);

    if (user === undefined || user === null) {
      req.session.status = "Username is incorrect.";

      // log POST request failure
      emitter.emit(
        "request",
        "request",
        "POST",
        res.statusCode,
        `/auth route POST failure (${req.session.status})`
      );

      res.redirect("/auth");
      return;
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
      );

      // log POST request success
      emitter.emit(
        "request",
        "request",
        "POST",
        res.statusCode,
        `/auth route POST success`
      );

      req.session.user = user;
      req.session.token = token;
      req.session.status = "Happy for your return " + user.username;
      res.redirect("/");

      return;
    } else {
      req.session.status = "Password is incorrect.";

      // log POST request failure
      emitter.emit(
        "request",
        "request",
        "POST",
        res.statusCode,
        `/auth route POST failure (${req.session.status})`
      );

      res.redirect("/auth");

      return;
    }
  } catch (error) {
    console.log(error);
    // res.render("503");
    return;
  }
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
router.post("/new", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if (req.body.email && req.body.username && req.body.password) {
      let result = await addLogin(
        req.body.username,
        req.body.email,
        hashedPassword,
        uuid.v4()
      );

      if (result.code === "23505" || result.code === 11000) {
        let constraint;

        function setConstraint(indexName) {
          const constraintsMap = {
            unique_username: "Username",
            unique_email: "Email address",
          };

          return constraintsMap[indexName] || indexName;
        }

        if (result.code === "23505") {
          constraint = setConstraint(result.constraint);
        } else if (result.code === 11000) {
          const match = result.errmsg.match(/index: (\w+)/);
          const indexName = match ? match[1] : "unknown";
          constraint = setConstraint(indexName);
        }

        req.session.status = `${constraint} already exists, please try another.`;

        // log POST request failure
        emitter.emit(
          "request",
          "request",
          "POST",
          res.statusCode,
          `/auth/new route POST failure (${req.session.status})`
        );

        res.redirect("/auth/new");

        return;
      } else {
        req.session.status = "New account created, please login.";

        // log POST request success
        emitter.emit(
          "request",
          "request",
          "POST",
          res.statusCode,
          `/auth/new route POST success`
        );

        res.redirect("/auth");

        return;
      }
    } else {
      req.session.status = "Not enough form fields completed.";

      // log POST request failure
      emitter.emit(
        "request",
        "request",
        "POST",
        res.statusCode,
        `/auth/new route POST failure (${req.session.status})`
      );

      res.redirect("/auth/new");
      return;
    }
  } catch (error) {
    res.render("503");
    return;
  }
});

// logout route (/auth/exit)
router.get("/exit", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }

    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/exit route accessed`
    );

    res.clearCookie("connect.sid");
    res.redirect("/auth");
  });
});

module.exports = router;
