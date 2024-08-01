const dal = require("./pg.db");
const fs = require("fs");

// load the sql query
const sqlQuery = fs.readFileSync("./db/sql/05-select.sql");

var getAllBooks = function () {
  return new Promise(function (resolve, reject) {
    const sql = `SELECT * FROM books`;

    dal.query(sql, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result.rows);
      }
    });
  });
};

var getByText = function (text, sort) {
  return new Promise(function (resolve, reject) {
    const sql = sqlQuery + sort;

    dal.query(sql, [text], (err, result) => {
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
