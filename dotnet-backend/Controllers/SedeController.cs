using Microsoft.AspNetCore.Mvc;
using dotnet_backend.Service;
using dotnet_backend.Models;

namespace dotnet_backend.Controllers;

[ApiController]
[Route("[controller]")]
public class SedeController : ControllerBase
{

    private SedeService sedeService = new SedeService();

    [HttpGet]
    public IEnumerable<Sede> GetSedi()
    {
        return sedeService.GetSedi();
    }

    [HttpGet("{id}")]
    public Sede GetSede(int id)
    {
        return sedeService.GetSede(id);
    }

    [HttpPost]
    public IActionResult Create(Sede sede)
    {
        var created = sedeService.Create(sede);
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
    public IActionResult Update(Sede sede)
    {
        var updated = sedeService.Update(sede);
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
        var deleted = sedeService.Delete(id);
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