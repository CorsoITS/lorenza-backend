const { validateToken } = require('../model/dao/token.dao');
const {getSedeOperatoreById }= require('../model/dao/operatore.dao')

async function controllaAutenticazione(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({
      messaggio: 'metti header per favore'
    })
  }
  const [bearer, token] = header.split(' ');
  if (bearer !== 'Bearer' || !token || token.lenth === 0) {
    return res.status(401).json({
      messaggio: 'metti header per bene per favore'
    })
  }
  const operatore_id = await validateToken(token)
  if (!operatore_id) {
    return res.status(403).json({
      messaggio: 'token non valido'
    })
  }
  req.operatore_id = operatore_id;
  req.sede_id=await getSedeOperatoreById(operatore_id);
  console.log(req.sede_id)
  next();
  // Controlliamo in qualche modo il token
}

module.exports = controllaAutenticazione