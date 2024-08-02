const db = require("./pg.db");
const fs = require("fs");

// load the sql query
const sqlQuery = fs.readFileSync("./db/sql/05-select.sql");

// get all books
const getAllBooks = function () {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM books`;

    db.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

// get books by search text
const getByText = function (text, sort) {
  return new Promise(function (resolve, reject) {
    const sql = sqlQuery + sort;

    db.query(sql, [text], (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getAllBooks,
  getByText,
};
