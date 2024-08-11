const db = require("./pg.db");

// add log
async function addLog(id, keyword) {
  const sql = `INSERT INTO public.logs(
	user_id, keyword, "timestamp")
	VALUES ($1, $2, $3);`;

  let date = new Date();

  try {
    await db.query(sql, [id, keyword, date]);
    return;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  addLog,
};
