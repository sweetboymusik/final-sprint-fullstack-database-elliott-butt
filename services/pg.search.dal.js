const dal = require("./pg.db");

var getAllBooks = function (text) {
  return new Promise(function (resolve, reject) {
    console.log("about to check DB");
    const sql = `SELECT * FROM books`;

    dal.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("resolving");
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getAllBooks,
};
