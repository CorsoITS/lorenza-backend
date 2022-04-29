using dotnet_backend.Repositories;
using dotnet_backend.Models;
namespace dotnet_backend.Service;

public class SedeService
{

    private SedeRepository sedeRepository = new SedeRepository();

    public IEnumerable<Sede> GetSedi()
    {
        return sedeRepository.GetSedi();
    }

    public Sede GetSede(int id)
    {
        return sedeRepository.GetSede(id);
    }

    public bool Create(Sede sede)
    {
        if (sedeRepository.GetSede(sede.id) == null)
        {
            if ((sede.nome.Length == 0) || (sede.citta.Length==0) || (sede.indirizzo.Length ==0))
            {
                return false;
            }
            else
            {
                return sedeRepository.Create(sede);
            }
        }
        else
        {
            return false;
        }

    }

    public bool Update(Sede sede)
    {
        return sedeRepository.Update(sede);
    }

    public bool Delete(int id)
    {
        return sedeRepository.Delete(id);
    }

}