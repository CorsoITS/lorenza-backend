
const { listSede, getSedeById, insertSede, updateSede, sedeExistById, sedeDeleteById, updateCampiSede} = require('../dao/sede.dao');

class Sede {
    constructor(p) {
        if (p) {
            if (p.id)                     this.id    =p.id;
            if (p.nome)                   this.nome  =p.nome;
            if (p.citta)                  this.citta =p.citta;
            if (p.indirizzo)              this.indirizzo  =p.indirizzo;
         } 
    }    
    
    static async lista () {
        let listaSedeDAO=await listSede();
        let res=[];

        listaSedeDAO.forEach( e => {
            res.push(new Sede(e));
        });
        console.log("Sede Model: list=" , res);
        return res;
    }

    static async get(id) {
        let ns=await getSedeById(id);
        if (ns) { return new Sede(ns);}
        return null;
    }

    static async exists(id) {
        return await sedeExistById(id);
    }


    static async delete(id) {
        return await sedeDeleteById(id);
    }

    setId(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.id=x;
    }
    getId() {
        return this.id;
    }

    existId () {
        if (this.id == null || typeof(this.id) == 'undefined') return false;
        return true; 
    }
    setNome(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'Nome cannot be null';
        this.nome=x;
    }
    getNome() {
        return this.nome;
    }

    setCitta(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'città cannot be null';
        this.citta=x;
    }
    getCitta() {
        return this.citta;
    }

    setIndirizzo(x) {
        if (x == null || typeof(x) == 'undefined')  throw 'indirizzo cannot be null';
        this.indirizzo=x;

    }
    getIndirizzo() {
        return this.indirizo;
    }


    async save() {
        if (typeof (this.id) != 'undefined' && this.id != null ) {
            // id e' definito quindi dobbiamo aggiornare il record della sede
            let res= await updateSede (this.id, this.nome, this.citta, this.indirizzo);
            if (! res) throw 'save sede failed (update case).'; 
        } else {
            // id non e' definito quindi dobbiamo creare un nuovo record
            let res= await insertSede(this.nome, this.citta, this.indirizzo);
            this.setId(res);
            if (! res) throw 'save sede failed (insert case).'; 
        }
    }

}

module.exports = Sede;
