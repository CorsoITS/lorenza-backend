using dotnet_backend.Repositories;
using dotnet_backend.Models;
namespace dotnet_backend.Service;

public class OperatoreService
{

    private OperatoreRepository operatoreRepository = new OperatoreRepository();

    public IEnumerable<Operatore> GetOperatori()
    {
        return operatoreRepository.GetOperatori();
    }

    public Operatore GetOperatore(int id)
    {
        return operatoreRepository.GetOperatore(id);
    }

    public bool Create(Operatore operatore)
    {
        if (operatoreRepository.GetOperatore(operatore.id) == null)
        {
            if ((operatore.ruolo.Length == 0) || (operatore.nome.Length==0) || (operatore.cognome.Length ==0))
            {
                return false;
            }
            else
            {
                return operatoreRepository.Create(operatore);
            }
        }
        else
        {
            return false;
        }

    }

    public bool Update(Operatore operatore)
    {
        return operatoreRepository.Update(operatore);
    }

    public bool Delete(int id)
    {
        return operatoreRepository.Delete(id);
    }

}