class Operatore {
  id;
  nome;
  cognome;
  ruolo;  
  username;
  password;
  sede_id;
   constructor(rawUtente) {
    this.id = rawUtente.id;
    this.nome = rawUtente.nome;
    this.cognome = rawUtente.cognome;
    this.ruolo = rawUtente.ruolo;
    this.username = rawUtente.username;
    this.password = rawUtente.password;
    this.sede_id = rawUtente.sede_id;
  }
  getPublicFields() {
    return {
      id: this.id,
      nome: this.nome,
      cognome: this.cognome,     
      ruolo: this.ruolo,
      username: this.username,
      sede_id: this.sede_id
    }
  }
}

module.exports = Operatore;