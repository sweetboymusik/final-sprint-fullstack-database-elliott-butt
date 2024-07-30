const dal = require("./pg.db");
const fs = require("fs");

const sqlQuery = fs.readFileSync("./db/sql/05-select.sql");
console.log(sqlQuery.toString());

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

let date = new Date();
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
