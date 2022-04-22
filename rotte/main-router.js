const routerPersona=require ('./persona-router');
const routerSede=require('./sede-router')


function ConnectRouter (app) {
    app.use('/persona', routerPersona);
    app.use('/sede', routerSede)

}

module.exports = ConnectRouter;