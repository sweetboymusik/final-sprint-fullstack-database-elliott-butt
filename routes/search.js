// import/configure express
const express = require("express");
const router = express.Router();

// import required auth function
const { ensureAuthenticated } = require("../services/passport");

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
  } catch (error) {}
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
        "SEARCH",
        "POSTGRES",
        `Search for '${req.body.search}'`
      );

      res.redirect(`./results/postgres/${req.body.search}`);
      // query mongo db
    } else if (req.body.db === "mongo") {
      // log search
      emitter.emit(
        "search",
        "search",
        "SEARCH",
        "MONGO",
        `Search for '${req.body.search}'`
      );

      res.redirect(`/results/mongo/${req.body.search}`);
      // query both dbs
    } else {
      // log search
      emitter.emit(
        "search",
        "search",
        "SEARCH",
        "BOTH",
        `Search for '${req.body.search}'`
      );
      res.redirect(`/results/both/${req.body.search}`);
    }
  } catch (error) {}
});

module.exports = router;
