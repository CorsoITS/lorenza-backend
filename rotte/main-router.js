const routerPersona=require ('./persona-router');
const routerSede=require('./sede-router');
const routerPrenotazioni= require('./prenotazione-router');


function ConnectRouter (app) {
    app.use('/persona', routerPersona);
    app.use('/sede', routerSede);
    app.use('/prenotazione', routerPrenotazioni);

}

module.exports = ConnectRouter;