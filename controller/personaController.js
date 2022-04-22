const Persona=require('../model/models/Persona');



class PersonaController {
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                console.log("PersonaController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p=await Persona.get(req.params.id);
                if (p ) {
                    console.log("PersonaController checkId found",p);
                    req.Persona=p;
                    next();
                }  else {
                    console.log("PersonaController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                console.log("Errore Cancellazione Persona - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            console.log("PersonaController ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }
      
    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return PersonaController.get(req,res);
        } 

        let result=await Persona.lista();
        return res.json(result);    
       
        
    } 

    static async get (req,res) {
        let result;
        if ( ! req.Persona ) {
            result=await Persona.get(req.params.id);
        } else {
            result = req.Persona;
        }
        return res.json(result);
        
    }

    static async crea (req,res) {
        try {
            console.log ("PersonaController: crea: files: ",req.files);
            console.log ("PersonaController: crea: body: ",req.body);
            let np=new Persona();
            
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.CF) np.setCodFis(req.body.CF);

            console.log("Creo nuova persona:", np);
            await  np.save();
            res.status(201).send("Created");
        } catch (err) {
            console.log ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Persona.delete(req.params.id) ) {
                    console.log("PersonaController eliminato ", req.params.id);
                    res.status(200).send('Ok');
                } else {
                    console.log("PersonaControllerErrore Cancellazione Persona", req.params.id);
                    res.status(400).send ("Errore Cancellazione Persona");
                }
        } catch (err) {
            console.log ("PersonaController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let np;
            if ( ! req.Persona ) {
                np=await Persona.get(req.params.id);
            } else {
                np = req.Persona;
            }
            console.log ("PersonaController: edit: body: ",req.body);
            if (req.body.nome) np.setNome(req.body.nome);
            if (req.body.cognome) np.setCognome(req.body.cognome);
            if (req.body.CF) np.setCodFis(req.body.CF);
            
            console.log("Salvo persona:", np);
            await  np.save();
            res.status(200).send("Ok");
        } catch (err) {
            console.log ("PersonaController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=PersonaController;