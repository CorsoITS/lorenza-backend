
const { listPrenotazione, getPrenotazioneById, insertPrenotazione, updatePrenotazione, prenotazioneExistById, prenotazioneDeleteById, updateCampiPrenotazione} = require('../dao/prenotazione.dao');

class Prenotazione {
    constructor(p) {
        if (p) {
            if (p.data)                      this.data   =p.data;
            if (p.sede_id)                   this.sede_id  =p.sede_id;
            if (p.persona_id)                this.persona_id=p.persona_id;
            if (p.somministrazione_id)       this.somministrazione_id=p.somministrazione_id;
            if (p.note)                      this.note=p.note;
         } 
    }    
    
    static async lista () {
        let listaPrenotazioneDAO=await listPrenotazione();
        let res=[];

        listaPrenotazioneDAO.forEach( e => {
            res.push(new Prenotazione(e));
        });
        console.log("Prenotazione Model: list=" , res);
        return res;
    }

    static async get(id) {
        let pr=await getPrenotazioneById(id);
        if (pr) { return new Prenotazione(pr);}
        return null;
    }

    // static async get(id_persona) {
    //     let pr=await getPrenotazioneByIdPersona(id_persona);
    //     if (pr) { return new Prenotazione(pr);}
    //     return null;
    // }

    static async exists(id) {
        return await prenotazioneExistById(id);
    }

    static async delete(id) {
        return await prenotazioneDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Id cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    existId () {
        if (this.id == null || typeof(this.id) == 'undefined') return false;
        return true; 
    }
    setData(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Data cannot be null';
        this.data=x;
    }
    getData() {
        return this.data;
    }

    setSedeId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Sede_id cannot be null';
        this.sede_id=x;
    }
    getSedeId() {
        return this.sede_id;
    }

    setPersonaId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Persona_id cannot be null';
        this.persona_id=x;
    }
    getPersonaID() {
        return this.persona_id;
    }

    setNote(x) {
        this.note=x;
    }
    getNote() {
        return this.note;
    }

    setSomministrazioneId(x) {
        this.somministrazione_id=x;
    }
    getSomministrazioneId() {
        return this.somministrazione_id;
    }



    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il recordo della persona
            let res= await updatePrenotazione (this.id, this.data, this.sede_id, this.persona_id, this.somministrazione_id, this.note);
            if (! res) throw 'save Prenotazione failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertPrenotazione (this.data, this.sede_id, this.persona_id, this.somministrazione_id, this.note);
            this.setId(res);
            if (! res) throw 'save Prenotazione failed (insert case).'; 
        }
    }

}

module.exports = Prenotazione;
