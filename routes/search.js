// import/configure express
const express = require("express");
const router = express.Router();

// import required auth function
const { ensureAuthenticated } = require("../services/passport");
const { addLog } = require("../services/pg.log.dal");

// import event emitter
const { emitter } = require("../services/log");

// base search route
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    // get error message if any
    const errorMessage = req.query.error;

    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/search route (login.ejs) accessed`
    );

    res.render("search", { errorMessage });
  } catch (error) {
    res.render("503");
  }
});

// redirect to correct route based on db chosen
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    // validate user input with regex
    // (injection attack prevention method)
    const input = req.body.search;
    const regex = /^[A-Za-z0-9]+$/;

    if (!input.match(regex)) {
      res.redirect(
        "/search?error=Invalid input, please use only letters and numbers."
      );
      return;
    }

    // query postgres db
    if (req.body.db === "postgres") {
      // log search
      emitter.emit(
        "search",
        "search",
        "POSTGRES",
        req.user.id,
        `Search for '${input}'`
      );

      res.redirect(`./results/postgres/${input}`);
      // query mongo db
    } else if (req.body.db === "mongo") {
      // log search
      emitter.emit(
        "search",
        "search",
        "MONGO",
        req.user.id,
        `Search for '${input}'`
      );

      res.redirect(`/results/mongo/${input}`);
      // query both dbs
    } else {
      // log search
      emitter.emit(
        "search",
        "search",
        "BOTH",
        req.user.id,
        `Search for '${input}'`
      );

      res.redirect(`/results/both/${input}`);
    }

    // insert log to pg db
    addLog(req.user.id, input);
  } catch (error) {
    res.render("503");
  }
});

module.exports = router;
