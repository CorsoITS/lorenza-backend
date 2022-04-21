class Utente {
  id;
  username;
  password;
  nome;
  cognome;
  data_nascita;
  constructor(rawUtente) {
    this.id = rawUtente.id;
    this.username = rawUtente.username;
    this.password = rawUtente.password;
    this.nome = rawUtente.nome;
    this.cognome = rawUtente.cognome;
    this.data_nascita = rawUtente.data_nascita;
  }
  getPublicFields() {
    return {
      id: this.id,
      username: this.username,
      nome: this.nome,
      cognome: this.cognome,
      data_nascita: this.data_nascita,
    }
  }
}

module.exports = Utente;