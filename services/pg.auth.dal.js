const dal = require("./pg.db");

// get user by username
async function getLoginByUsername(username) {
  let SQL = `SELECT id AS id, username, password, email FROM users WHERE username = $1`;

  try {
    let results = await dal.query(SQL, [username]);
    return results.rows[0];
  } catch (error) {
    console.log(error);
  }
}

// get user by username by ID
async function getUserById(id) {
  let SQL = `SELECT id AS id, username, password, email FROM users WHERE id = $1`;

  try {
    let results = await dal.query(SQL, [id]);
    return results.rows[0];
  } catch (error) {
    console.log(error);
  }
}

// add a login/user to database
async function addLogin(name, email, password, uuidv4) {
  let SQL = `INSERT INTO users (username, email, password, uuid)
    VALUES ($1, $2, $3, $4) RETURNING id;`;

  try {
    let results = await dal.query(SQL, [name, email, password, uuidv4]);
    let user = await getUserById(parseInt(results.rows[0].id));
    return user;
  } catch (error) {
    if (error.code === "23505") return error;
    console.log(error);
  }
}

// export functions
module.exports = {
  getLoginByUsername,
  getUserById,
  addLogin,
};
