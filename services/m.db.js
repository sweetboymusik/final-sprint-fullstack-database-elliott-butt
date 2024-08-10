// import to get .env variables for test
require("dotenv").config();

// mongo db connection
const { MongoClient } = require("mongodb");
const uri = process.env.M_LOCAL;
const pool = new MongoClient(uri);

module.exports = pool;
