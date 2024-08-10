const dal = require("./pg.db");

async function getLoginByUsername(username) {
  let SQL = `SELECT id AS id, username, password, email FROM users WHERE username = $1`;

  try {
    let results = await dal.query(SQL, [username]);
    console.log(results.rows);
    return results.rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function addLogin(name, email, password, uuidv4) {
  let SQL = `INSERT INTO users (username, email, password, uuid)
    VALUES ($1, $2, $3, $4) RETURNING id;`;

  try {
    let results = await dal.query(SQL, [name, email, password, uuidv4]);
    return results.rows[0].id;
  } catch (error) {
    if (error.code === "23505") return error;
    console.log(error);
  }
}

module.exports = {
  getLoginByUsername,
  addLogin,
};
