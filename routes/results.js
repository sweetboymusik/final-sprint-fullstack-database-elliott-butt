// import/configure express
const express = require("express");
const router = express.Router();

// import postgres and mongo DAL
const pgDAL = require("../services/pg.search.dal");
const mDAL = require("../services/m.search.dal");

// import required auth function
const { ensureAuthenticated } = require("../services/passport");

// import event emitter
const { emitter } = require("../services/log.js");

// root results route (/results)
router.get("/", ensureAuthenticated, async (req, res) => {
  try {
    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/results route (results.ejs) accessed`
    );

    res.render("results");
  } catch (error) {
    res.render("503");
  }
});

// empty postgres route (/results/postgres)
router.get("/postgres/", ensureAuthenticated, async (req, res) => {
  try {
    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/results/postgres route (results.ejs) accessed`
    );

    // render results page
    res.render("results", { books: [] });
  } catch (error) {
    res.render("503");
  }
});

// empty mongo route (/results/mongo)
router.get("/mongo/", ensureAuthenticated, async (req, res) => {
  try {
    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/results/mongo route (results.ejs) accessed`
    );

    // render results page
    res.render("results", { books: [] });
  } catch (error) {
    res.render("503");
  }
});

// empty both route (/results/both)
router.get("/both/", ensureAuthenticated, async (req, res) => {
  try {
    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/results/both route (results.ejs) accessed`
    );

    // render results page
    res.render("results", { books: [] });
  } catch (error) {
    res.render("503");
  }
});

// postgres results route (/results/postgres/:text)
router.get("/postgres/:text", ensureAuthenticated, async (req, res) => {
  try {
    // get books from pg and map to include db source
    let books = await pgDAL.getByText(`%${req.params.text}%`, `author ASC`);
    let booksMapped = books.map((book) => ({ ...book, source: "postgres" }));

    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/results/postgres/${req.params.text} route (results.ejs) accessed`
    );

    // render results page
    res.render("results", { books: booksMapped });
  } catch (error) {
    res.render("503");
  }
});

// mongo results route (/results/mongo/:text)
router.get("/mongo/:text", ensureAuthenticated, async (req, res) => {
  try {
    // get books from mongo and map to include db source
    let books = await mDAL.getByText(`${req.params.text}`, `author ASC`);
    let booksMapped = books.map((book) => ({ ...book, source: "mongo" }));

    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/results/mongo/${req.params.text} route (results.ejs) accessed`
    );

    // render results page
    res.render("results", { books: booksMapped });
  } catch (error) {
    res.render("503");
  }
});

// both results route (/results/both/:text)
router.get("/both/:text", ensureAuthenticated, async (req, res) => {
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

    // log GET request
    emitter.emit(
      "request",
      "request",
      "GET",
      res.statusCode,
      `/results/both/${req.params.text} route (results.ejs) accessed`
    );

    // render results page
    res.render("results", { books: combined });
  } catch (error) {
    res.render("503");
  }
});

module.exports = router;
