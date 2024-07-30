// import/configure express
const express = require("express");
const router = express.Router();

const { getAllBooks } = require("../services/pg.search.dal");

// /search
router.get("/", async (req, res) => {
  try {
    res.render("search");
  } catch (error) {}
});

router.get("/results", async (req, res) => {
  try {
    console.log("trying to get all books");
    let books = await getAllBooks();
    res.render("results", { books });
  } catch (error) {}
});

module.exports = router;
