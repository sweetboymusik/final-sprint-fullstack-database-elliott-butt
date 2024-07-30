const express = require("express");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const router = express.Router();

router.get("/", async (req, res) => {
  res.render("login");
  return;
});

router.post("/", async (req, res) => {});

module.exports = router;
