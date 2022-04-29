using Microsoft.AspNetCore.Mvc;
using dotnet_backend.Service;
using dotnet_backend.Models;

namespace dotnet_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class PersonaController : ControllerBase
{

    private PersonService personService = new PersonService();

    [HttpGet]
    public IEnumerable<Persona> GetPeople()
    {
        return personService.GetPeople();
    }

    [HttpGet("{id}")]
    public Persona GetPerson(int id)
    {
        return personService.GetPerson(id);
    }

    [HttpPost]
    public IActionResult Create(Persona person)
    {
        var created = personService.Create(person);
        if (created)
        {
            return Ok();

        }
        else
        {
            return BadRequest();
        }
    }

    [HttpPut]
    public IActionResult Update(Persona person)
    {
        var updated = personService.Update(person);
        if (updated)
        {
            return Ok();

        }
        else
        {
            return BadRequest();
        }
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var deleted = personService.Delete(id);
        if (deleted)
        {
            return Ok();

        }
        else
        {
            return BadRequest();
        }
    }
}