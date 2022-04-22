const { getConnection } = require('../../db/connessione');
const Operatore = require('../models/Operatore');

async function getOperatoreByUsername(username) {
  const conn = await getConnection();
  const [operatori] = await conn.query('SELECT * FROM operatore WHERE username = ?', [username]);
  return new Operatore(operatori[0]);
}

async function getOperatoreById(id) {
  const conn = await getConnection();
  const [operatori] = await conn.query('SELECT * FROM operatore WHERE id = ?', [id]);
  return new Operatore(operatori[0]);
}

async function insertOperatore(nome, cognome, ruolo, username, passwordHash, sede_id) {
  const conn = await getConnection();
  const [insert] = await conn.query(
    'INSERT INTO operatore (nome, cognome, ruolo, username, password, sede_id) values (?, ?, ?, ?, ?, ?)',
    [nome, cognome, ruolo, username, passwordHash, sede_id]);
  return insert.insertId;
}

module.exports = {
  getOperatoreByUsername,
  insertOperatore,
  getOperatoreById
}