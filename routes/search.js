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
    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/search route (login.ejs) accessed`
    );

    res.render("search");
  } catch (error) {
    res.render("503");
  }
});

// redirect to correct route based on db chosen
router.post("/", ensureAuthenticated, async (req, res) => {
  try {
    // query postgres db
    if (req.body.db === "postgres") {
      // log search
      emitter.emit(
        "search",
        "search",
        "POSTGRES",
        req.user.id,
        `Search for '${req.body.search}'`
      );

      res.redirect(`./results/postgres/${req.body.search}`);
      // query mongo db
    } else if (req.body.db === "mongo") {
      // log search
      emitter.emit(
        "search",
        "search",
        "MONGO",
        req.user.id,
        `Search for '${req.body.search}'`
      );

      res.redirect(`/results/mongo/${req.body.search}`);
      // query both dbs
    } else {
      // log search
      emitter.emit(
        "search",
        "search",
        "BOTH",
        req.user.id,
        `Search for '${req.body.search}'`
      );

      res.redirect(`/results/both/${req.body.search}`);
    }

    // insert log to pg db
    addLog(req.user.id, req.body.search);
  } catch (error) {
    res.render("503");
  }
});

module.exports = router;
