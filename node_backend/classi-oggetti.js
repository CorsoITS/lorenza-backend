const oggetto = {
  nome: 'Fabrizio',
  cognome: 'Marconi',
};

class Persona {
  nome;
  cognome;
  constructor(nome, cognome) {
    this.nome = nome;
    this.cognome = cognome
  }

  getDenominazione() {
    return this.nome + ' ' + this.cognome
  }
}

const persona = new Persona('Giovanni', 'Capuani')
console.log(persona.nome)
console.log(persona.cognome)
console.log(persona.getDenominazione())

class Utility {
  getCodiceIta() {
    return 'ITA';
  };

  parseJson(string) {
    return JSON.parse(string)
  }

  async getInDatabases(id) {
    return {

    }
  }
}

const utility = new Utility();

console.log(utility.getCodiceIta());