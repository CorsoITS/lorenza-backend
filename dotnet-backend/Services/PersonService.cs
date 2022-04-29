using dotnet_backend.Repositories;
using dotnet_backend.Models;
namespace dotnet_backend.Service;

public class PersonService
{

    private PersonRepository personRepository = new PersonRepository();

    public IEnumerable<Persona> GetPeople()
    {
        return personRepository.GetPeople();
    }

    public Persona GetPerson(int id)
    {
        return personRepository.GetPerson(id);
    }

    public bool Create(Persona person)
    {
        if (personRepository.GetPerson(person.id) == null)
        {
            if ((person.codice_fiscale.Length < 16) || (person.nome.Length==0) || (person.cognome.Length ==0))
            {
                return false;
            }
            else
            {
                return personRepository.Create(person);
            }
        }
        else
        {
            return false;
        }

    }

    public bool Update(Persona person)
    {
        return personRepository.Update(person);
    }

    public bool Delete(int id)
    {
        return personRepository.Delete(id);
    }

}