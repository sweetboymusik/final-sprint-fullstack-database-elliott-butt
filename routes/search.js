// import/configure express
const express = require("express");
const router = express.Router();

const { authenticateToken } = require("../services/auth");

// base search route
router.get("/", authenticateToken, async (req, res) => {
  try {
    res.render("search");
  } catch (error) {}
});

// redirect to correct route based on db chosen
router.post("/", authenticateToken, async (req, res) => {
  try {
    // query postgres db
    if (req.body.db === "postgres") {
      res.redirect(`./results/postgres/${req.body.search}`);
      // query mongo db
    } else if (req.body.db === "mongo") {
      res.redirect(`/results/mongo/${req.body.search}`);
      // query both dbs
    } else {
      res.redirect(`/results/both/${req.body.search}`);
    }
  } catch (error) {}
});

module.exports = router;
