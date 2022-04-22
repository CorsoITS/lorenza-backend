const Sede=require('../model/models/Sede');



class SedeController {
    static async checkId (req,res,next) {
        try {
            if (req.params.id ) {
                console.log("SedeController checkId req.params.id:", req.params.id);
                const eIntero = parseInt(req.params.id);
                if(isNaN(eIntero)) {
                  return res.status(400).send("id non numerico");
                }
                let p;
                p=await Sede.get(req.params.id);
                if (p ) {
                    console.log("SedeController checkId found",p);
                    req.Sede=p;
                    next();
                }  else {
                    console.log("SedeController checkId Errore - id non trovato");
                    return res.status(404).send ("Id non trovato");                    
                }               
            } else {
                console.log("Errore Cancellazione Sede - id non fornito");
                return res.status(404).send("Id NON Fornito");
            }
        } catch (err) {
            console.log("SedeController ERRORE:", err);
            return res.status(500).send ("Internal Server Error");
        }            
    }
      
    static async lista (req , res){
        if (req.query.q){
            if ( !req.params ) req.params={};
            req.params.id=req.query.q;
            return SedeController.get(req,res);
        } 

        let result=await Sede.lista();
        return res.json(result);    
       
        
    } 

    static async get (req,res) {
        let result;
        if ( ! req.Sede ) {
            result=await Sede.get(req.params.id);
        } else {
            result = req.Sede;
        }
        return res.json(result);
        
    }

    static async crea (req,res) {
        try {
            console.log ("SedeController: crea: body: ",req.body);
            let ns=new Sede();
            
            if (req.body.nome) ns.setNome(req.body.nome);
            if (req.body.citta) ns.setCitta(req.body.citta);
            if (req.body.indirizzo) ns.setIndirizzo(req.body.indirizzo);

            console.log("Creo nuova sede:", ns);
            await  ns.save();
            res.status(201).send("Created");
        } catch (err) {
            console.log ("ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async elimina (req,res) {
        try {
                 if (await Sede.delete(req.params.id) ) {
                    console.log("SedeController eliminato ", req.params.id);
                    res.status(200).send('Ok');
                } else {
                    console.log("SedeControllerErrore Cancellazione sede", req.params.id);
                    res.status(400).send ("Errore Cancellazione Sede");
                }
        } catch (err) {
            console.log ("PersonaController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }
    }

    static async edit (req,res) {
        try {
            let ns;
            if ( ! req.Sede) {
                ns=await Sede.get(req.params.id);
            } else {
                ns = req.Sede;
            }
            console.log ("SedeController: edit: body: ",req.body);
            if (req.body.nome) ns.setNome(req.body.nome);
            if (req.body.citta) ns.setCitta(req.body.citta);
            if (req.body.indirizzo) ns.setIndirizzo(req.body.indirizzo);
            
            console.log("Salvo sede:", ns);
            await  ns.save();
            res.status(200).send("Ok");
        } catch (err) {
            console.log ("SedeController ERRORE:", err);
            res.status(500).send ("Internal Server Error");
        }

    }

}

module.exports=SedeController;