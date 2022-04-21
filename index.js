require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { json, urlencoded } = require('body-parser');
const { routerAuth } = require('./rotte/auth');
const controllaAutenticazione = require('./middlewares/check-auth');
const { getUtenteById } = require('./model/dao/utente.dao');
const app = express()

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.options('*', cors())
app.get('/', function (req, res) {
  res.json({
    messaggio: 'Ingresso delle api backend'
  }).send()
});

app.use('/', routerAuth);

app.get('/utente', controllaAutenticazione, async (req, res) => {
  const utente = await getUtenteById(req.utente_id)
  return res.json(utente.getPublicFields());
})

app.listen(3000);