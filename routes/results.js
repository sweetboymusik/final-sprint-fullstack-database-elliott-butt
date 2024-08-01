// import/configure express
const express = require("express");
const router = express.Router();

// import postgres and mongo DAL
const pgDAL = require("../services/pg.search.dal");

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
    if (req.params.text === "") {
      console.log("here");
      res.render("results", { books: [] });
    } else {
      let books = await pgDAL.getByText(`%${req.params.text}%`, `author ASC`);
      res.render("results", { books });
    }
  } catch (error) {}
});

// mongo results
router.get("/mongo/:text", async (req, res) => {
  try {
    let books = await pgDAL.getByText(`%${req.params.text}%`, `author ASC`);
    res.render("results", { books });
  } catch (error) {}
});

// both results
router.get("/both/:text", async (req, res) => {
  try {
    let books = await pgDAL.getByText(`%${req.params.text}%`, `author ASC`);
    res.render("results", { books });
  } catch (error) {}
});

module.exports = router;
