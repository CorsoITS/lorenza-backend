require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { json, urlencoded } = require('body-parser');
const { routerAuth } = require('./rotte/auth');
const ConnectRouter = require('./rotte/main-router')
const controllaAutenticazione = require('./middlewares/check-auth');
const { getOperatoreById } = require('./model/dao/operatore.dao');
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
ConnectRouter(app);

app.get('/operatore', controllaAutenticazione, async (req, res) => {
  const utente = await getOperatoreById(req.utente_id)
  return res.json(utente.getPublicFields());
})

app.listen(3000);