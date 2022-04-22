const res = require('express/lib/response');
const { getConnection } = require('../../db/connessione')

const listPrenotazione = async () => {
  const connection = await getConnection();
  let query='SELECT * FROM prenotazione';

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
  const query = 'SELECT 1 FROM prenotazione WHERE id = ?';
  const [rows] = await connection.query(query, [id_prenotazione]);
  return rows.length > 0;
}

const getPrenotazioneById = async (id_prenotazione) => {
  const connection = await getConnection();
  const query = 'SELECT * FROM prenotazione WHERE id = ?';
  const [rows] = await connection.query(query, [id_prenotazione]);
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
  const query = `UPDATE prenotazione SET data = ?, sede_id = ?, persona_id = ?
  WHERE id = ?`;
  const [res] = await connection.query(query, [data, sede_id, persona_id, id]);
  return res.affectedRows === 1;
  }catch(e){
    console.log ('errore' + e);
    return res.status(500).send('internal server error');
    }
}

const updateCampiPrenotazione = async (id, data, sede_id, persona_id) => {
  const connection = await getConnection();
  const campi = [];
  const params = [];
  if (data !== undefined) {
    campi.push('data');
    params.push(data);
  }
  if (sede_id !== undefined) {
    campi.push('sede_id');
    params.push(sede_id);
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


const prenotazioneDeleteById = async (id_prenotazione) => {
  const connection = await getConnection();
  const query = 'DELETE FROM prenotazione WHERE id = ?';
  const [res] = await connection.query(query, [id_prenotazione]);
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