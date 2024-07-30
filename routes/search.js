// import/configure express
const express = require("express");
const router = express.Router();

const { getAllBooks, getByText } = require("../services/pg.search.dal");

// /search
router.get("/", async (req, res) => {
  try {
    res.render("search");
  } catch (error) {}
});

router.get("/results", async (req, res) => {
  try {
    let books = await getByText("%da%", "author ASC");
    res.render("results", { books });
  } catch (error) {}
});

module.exports = router;
