const { Router } = require('express');
const { compare, hash } = require('bcrypt');
const { randomUUID } = require('crypto');
const { getUtenteByUsername, insertUtente } = require('../model/dao/utente.dao');
const { persistToken } = require('../model/dao/token.dao');

const routerAuth = Router();

routerAuth.post('/login', async (req, res) => {
  const { username, password } = req.body
  const utente = await getUtenteByUsername(username);
  if (await compare(password, utente.password)) {
    // è lui
    const token = randomUUID()
    await persistToken(token, utente.id);
    return res.json(token)
  } else {
    // non è lui
    return res.status(404).json({
      messaggio: 'non ti conosco'
    })
  }
});

routerAuth.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (password.length < 3) {
    return res.status(400).send({
      message: 'la password deve essere più lunga di 3 caratteri'
    })
  }
  const passwordHash = await hash(password, 10);
  const re = await insertUtente(username, passwordHash);
  return res.json(re);
})

module.exports = {
  routerAuth
};