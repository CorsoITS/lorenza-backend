const res = require('express/lib/response');
const { getConnection } = require('../../db/connessione')


const listPrenotazione = async (s) => {
  const connection = await getConnection();
  let sedeOperatore=s;
  let query=`SELECT * FROM prenotazione where sede_id=${sedeOperatore}`;

  console.log('Query:' + query);
  const [rows] = await connection.query(query);
  console.log('Query Result:', rows);
  return rows;
}

// const prenotazioneExistByIdPersona = async (id_persona) => {
//   const connection = await getConnection();
//   const query = 'SELECT 1 FROM prenotazione inner join persona on persona.id=prenotazione.persona_id WHERE persona_id = ?';
//   const [rows] = await connection.query(query, [id_persona]);
//   return rows.length > 0;
// }
const prenotazioneExistById = async (id_prenotazione) => {
  const connection = await getConnection();
  const query = 'SELECT 1 FROM INNER JOIN operatore on prenotazione.sede_id=operatore.sede_id WHERE prenotazione.id = ?';
  const [rows] = await connection.query(query, [id_prenotazione]);
  return rows.length > 0;
}

const getPrenotazioneById = async (id_prenotazione, s) => {
  const connection = await getConnection();
  const query = `SELECT prenotazione.*, persona.nome, persona.cognome FROM prenotazione 
  INNER JOIN persona ON prenotazione.persona_id=persona.id WHERE (prenotazione.id = ? AND prenotazione.sede_id = ?)`;
  const [rows] = await connection.query(query, [id_prenotazione, s]);
  console.log(rows[0]);
  return rows[0];
}

const insertPrenotazione = async (data, sede_id, persona_id, somministrazione_id, note) => {
  const connection = await getConnection();
  const query = `INSERT INTO prenotazione (data, sede_id, persona_id, somministrazione_id, note)
  VALUES (?,?,?,?,?)`;
  const [res] = await connection.query(query, [data, sede_id, persona_id, somministrazione_id, note]);
  return res.insertId;
}

const updatePrenotazione = async (id, data, sede_id, persona_id) => {
  const connection = await getConnection();
  try{
  const query = `UPDATE prenotazione SET data = ?, persona_id = ?
  WHERE id = ?`;
  const [res] = await connection.query(query, [data, persona_id, id]);
  return res.affectedRows === 1;
  }catch(e){
    console.log ('errore' + e);
    return res.status(500).send('internal server error');
    }
}

const updateCampiPrenotazione = async (id, data,persona_id) => {
  const connection = await getConnection();
  const campi = [];
  const params = [];
  if (data !== undefined) {
    campi.push('data');
    params.push(data);
  }

  if (persona_id !== undefined) {
    campi.push('persona_id');
    params.push(persona_id);
  }

  params.push(id);
  const query = `UPDATE prenotazione SET ${campi.map(campo => campo + ` = ?`).join(',')} WHERE id = ?`;
  const [res] = await connection.query(query, params);
  return res.affectedRows === 1;
}


const prenotazioneDeleteById = async (id_prenotazione, s) => {
  const connection = await getConnection();
  const query = 'DELETE FROM prenotazione WHERE id = ? AND sede_id=?';
  const [res] = await connection.query(query, [id_prenotazione, s]);
  return res.affectedRows === 1;
}
module.exports = {
  listPrenotazione,
  prenotazioneExistById,
  //prenotazioneExistByIdPersona,
  getPrenotazioneById,
  insertPrenotazione,
  updatePrenotazione,
  updateCampiPrenotazione,
  prenotazioneDeleteById
}