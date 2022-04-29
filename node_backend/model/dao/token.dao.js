const { getConnection } = require('../../db/connessione');

async function persistToken(token, userId, exp = 1000 * 60 * 30) {
  const conn = await getConnection();
  const date = new Date();
  const expn = date.getTime() + exp;
  await conn.query(
    'INSERT INTO token (token, opertore_id, exp) VALUES (?, ?, ?)',
    [token, userId, expn]);
}

async function validateToken(token) {
  const conn = await getConnection();
  const [rows] = await conn.query(
    'SELECT * FROM token WHERE token = ?',
    [
      token
    ]
  );
  const row = rows[0];
  if(!row) {
    return false;
  }
  const now = (new Date).getTime()
  if (now > row.exp) {
    return false;
  }

  // update exp 
  return row.opertore_id
}

module.exports = {
  persistToken,
  validateToken
}