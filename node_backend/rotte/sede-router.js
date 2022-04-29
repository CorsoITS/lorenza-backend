const { Router } = require('express');
const routerSede = Router();
const SedeController = require ('../controller/sedeController');



 routerSede.get('/', SedeController.lista);
 routerSede.post('/crea', SedeController.crea) ;
 routerSede.delete('/:id', SedeController.checkId, SedeController.elimina);
 routerSede.get('/:id', SedeController.checkId, SedeController.get);
 routerSede.put('/:id', SedeController.checkId, SedeController.edit);



module.exports = routerSede;