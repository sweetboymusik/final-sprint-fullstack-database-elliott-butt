const express = require("express");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { addLogin, getLoginByUsername } = require("../services/pg.auth.dal");

router.get("/", async (req, res) => {
  res.render("login");
  return;
});

router.post("/", async (req, res) => {
  try {
    let user = await getLoginByUsername(req.body.username);

    if (user === undefined || user === null) {
      req.session.status = "Username is incorrect.";
      console.log(req.session.status);
      res.redirect("/auth");
      return;
    }

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1m" }
      );

      req.session.user = user;
      req.session.token = token;
      req.session.status = "Happy for your return " + user.username;
      res.redirect("/");

      return;
    } else {
      req.session.status = "Password is incorrect.";
      res.redirect("/auth");

      return;
    }
  } catch (error) {
    console.log(error);
    // res.render("503");
    return;
  }
});

// GET (display) the register html page
router.get("/new", async (req, res) => {
  res.render("register", { status: req.session.status });
  return;
});

// POST (register) the new login
router.post("/new", async (req, res) => {
  try {
    console.log("here");
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

          return constraintsMap[indexName] || indexName; // Default to indexName if not found
        }

        if (result.code === "23505") {
          constraint = setConstraint(result.constraint);
        } else if (result.code === 11000) {
          // MongoDB unique violation
          const match = result.errmsg.match(/index: (\w+)/);
          const indexName = match ? match[1] : "unknown";
          constraint = setConstraint(indexName);
        }

        if (DEBUG)
          req.session.status = `${constraint} already exists, please try another.`;
        res.redirect("/auth/new");

        return;
      } else {
        req.session.status = "New account created, please login.";
        res.redirect("/auth");

        return;
      }
    } else {
      req.session.status = "Not enough form fields completed.";
      res.redirect("/auth/new");
      return;
    }
  } catch (error) {
    res.render("503");
    return;
  }
});

// clear the session
router.get("/exit", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    res.redirect("/auth");
  });
});

module.exports = router;
