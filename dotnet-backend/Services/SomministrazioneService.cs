using dotnet_backend.Repositories;
using dotnet_backend.Models;
namespace dotnet_backend.Service;


public class SomministrazioneService
{

    private SomministrazioneRepository somministrazioneRepository = new SomministrazioneRepository();
    public PersonRepository PR = new PersonRepository();
    public OperatoreRepository OS = new OperatoreRepository();

    public IEnumerable<Somministrazione> GetSomministrazioni()
    {
        return somministrazioneRepository.GetSomministrazioni();
    }
        public IEnumerable<Somministrazione> GetSomministrazioniVaccino(string vaccino)
    {
        return somministrazioneRepository.GetSomministrazioniVaccino(vaccino);
    }

    public Somministrazione GetSomministrazione(int id)
    {
        return somministrazioneRepository.GetSomministrazione(id);
    }

    public bool Create(Somministrazione somministrazione)
    {
        if (somministrazioneRepository.GetSomministrazione(somministrazione.id) == null)
        {
            if ((somministrazione.vaccino.Length == 0) || (somministrazione.dose.Length==0))
            {
                return false;
                }
        if(PR.GetPerson(somministrazione.persona_id) == null){
                Console.WriteLine("la persona indicata non esiste");
                return false;
                }
        if(OS.GetOperatore(somministrazione.opertore_id) == null){
                Console.WriteLine("l'operatore indicato non esiste");
                return false;
                }
   
            else
            {
                return somministrazioneRepository.Create(somministrazione);
            }
        }
        else
        {
            return false;
        }

    }

    public bool Update(Somministrazione somministrazione)
    {
        return somministrazioneRepository.Update(somministrazione);
    }

    public bool Delete(int id)
    {
        return somministrazioneRepository.Delete(id);
    }

}