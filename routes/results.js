// import/configure express
const express = require("express");
const router = express.Router();

// import postgres and mongo DAL
const pgDAL = require("../services/pg.search.dal");
const mDAL = require("../services/m.search.dal");

// import event emitter
const emitter = require("../services/log.js");

router.get("/", async (req, res) => {
  try {
    res.render("results");
  } catch (error) {}
});

// empty postgres route
router.get("/postgres/", async (req, res) => {
  try {
    res.render("results", { books: [] });
  } catch (error) {}
});

// empty mongo route
router.get("/mongo/", async (req, res) => {
  try {
    res.render("results", { books: [] });
  } catch (error) {}
});

// empty both route
router.get("/both/", async (req, res) => {
  try {
    res.render("results", { books: [] });
  } catch (error) {}
});

// postgres results
router.get("/postgres/:text", async (req, res) => {
  try {
    // get books from pg and map to include db source
    let books = await pgDAL.getByText(`%${req.params.text}%`, `author ASC`);
    let booksMapped = books.map((book) => ({ ...book, source: "postgres" }));

    // render results
    res.render("results", { books: booksMapped });
  } catch (error) {}
});

// mongo results
router.get("/mongo/:text", async (req, res) => {
  try {
    // get books from mongo and map to include db source
    let books = await mDAL.getByText(`${req.params.text}`, `author ASC`);
    let booksMapped = books.map((book) => ({ ...book, source: "mongo" }));

    // render results
    res.render("results", { books: booksMapped });
  } catch (error) {}
});

// both results
router.get("/both/:text", async (req, res) => {
  try {
    // get books from pg and map to include db source
    let pgBooks = await pgDAL.getByText(`%${req.params.text}%`, `author ASC`);
    let pgBooksMapped = pgBooks.map((book) => ({
      ...book,
      source: "postgres",
    }));

    // get books from mongo and map to include db source
    let mBooks = await mDAL.getByText(`${req.params.text}`, `author ASC`);
    let mBooksMapped = mBooks.map((book) => ({ ...book, source: "mongo" }));

    // combine book lists using the spread operator
    let combined = [...pgBooksMapped, ...mBooksMapped];

    // render results
    res.render("results", { books: combined });
  } catch (error) {}
});

module.exports = router;
