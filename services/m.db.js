// mongo db connection
const { MongoClient } = require("mongodb");
const uri = process.env.M_LOCAL;
const pool = new MongoClient(uri);

module.exports = pool;
