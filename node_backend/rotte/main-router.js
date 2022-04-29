const routerPersona=require ('./persona-router');
const routerSede=require('./sede-router');
const routerPrenotazioni= require('./prenotazione-router');
const controllaAutenticazione = require('../middlewares/check-auth')


function ConnectRouter (app) {
    app.use('/persona', routerPersona);
    app.use('/sede', controllaAutenticazione, routerSede);
    app.use('/prenotazione', controllaAutenticazione, routerPrenotazioni);

}

module.exports = ConnectRouter;