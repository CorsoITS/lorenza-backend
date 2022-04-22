const Prenotazione=require('../model/models/Prenotazione');



class PrenotazioneController {
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                console.log("PrenotazioneController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p=await Prenotazione.get(req.params.id);
                if (p ) {
                    console.log("PrenotazioneController checkId found",p);
                    req.Prenotazione=p;
                    next();
                }  else {
                    console.log("PrenotazioneController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                console.log("Errore Cancellazione prenotazione - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            console.log("PrenotazioneController ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }
      
    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return PrenotazioneController.get(req,res);
        } 

        let result=await Prenotazione.lista();
        return res.json(result);    
       
        
    } 

    static async get (req,res) {
        let result;
        if ( ! req.Prenotazione ) {
            result=await Prenotazione.get(req.params.id);
        } else {
            result = req.Prenotazione;
        }
        return res.json(result);
        
    }

    static async crea (req,res) {
        try {
            console.log ("PrenotazioneController: crea: body: ",req.body);
            let np=new Prenotazione();
            
            if (req.body.data) np.setData(req.body.data);
            if (req.body.sede_id) np.setSedeId(req.body.sede_id);
            if (req.body.persona_id) np.setPersonaId(req.body.persona_id);
            if (req.body.somministrazione_id) np.setSomministrazioneId(req.body.somministrazione_id);
            if (req.body.note) np.setNote(req.body.note);

            console.log("Creo nuova prenotazione:", np);
            await  np.save();
            res.status(201).send("Created");
        } catch (err) {
            console.log ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Prenotazione.delete(req.params.id) ) {
                    console.log("PrenotazioneController eliminato ", req.params.id);
                    res.status(200).send('Ok');
                } else {
                    console.log("PrenotazioneControllerErrore Cancellazione Prenotazione", req.params.id);
                    res.status(400).send ("Errore Cancellazione Prenotazione");
                }
        } catch (err) {
            console.log ("PrenotazioneController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Prenotazione ) {
                np=await Prenotazione.get(req.params.id);
            } else {
                np = req.Prenotazione;
            }
            console.log ("PrenotazioneController: edit: body: ",req.body);
            np.id=req.params.id;
            if (req.body.data) np.setData(req.body.data);
            if (req.body.sede_id) np.setSedeId(req.body.sede_id);
            if (req.body.persona_id) np.setPersonaId(req.body.persona_id);
            if (req.body.somministrazione_id) np.setSomministrazioneId(req.body.somministrazione_id);
            if (req.body.note) np.setNote(req.body.note);

            
            console.log("Salvo prenotazione:", np);
            await  np.save();
            res.status(200).send("Ok");
        } catch (err) {
            console.log ("PrenotazioneController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=PrenotazioneController;