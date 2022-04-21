const { getConnection } = require('../../db/connessione');
const Utente = require('../models/Utente');

async function getUtenteByUsername(username) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM utente WHERE username = ?', [username]);
  return new Utente(utenti[0]);
}

async function getUtenteById(id) {
  const conn = await getConnection();
  const [utenti] = await conn.query('SELECT * FROM utente WHERE id = ?', [id]);
  return new Utente(utenti[0]);
}

async function insertUtente(username, passwordHash) {
  const conn = await getConnection();
  const [insert] = await conn.query(
    'INSERT INTO utente (username, password) values (?, ?)',
    [username, passwordHash]);
  return insert.insertId;
}

module.exports = {
  getUtenteByUsername,
  insertUtente,
  getUtenteById
}