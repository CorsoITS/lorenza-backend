const { Router } = require('express');
const routerPrenotazioni = Router();
const PrenotazioneController = require ('../controller/prenotazioneController');



routerPrenotazioni.get('/', PrenotazioneController.lista);
routerPrenotazioni.post('/crea', PrenotazioneController.crea) ;
routerPrenotazioni.delete('/:id', PrenotazioneController.checkId, PrenotazioneController.elimina);
routerPrenotazioni.get('/:id', PrenotazioneController.checkId, PrenotazioneController.get);
routerPrenotazioni.put('/:id', PrenotazioneController.checkId, PrenotazioneController.edit);



module.exports = routerPrenotazioni;