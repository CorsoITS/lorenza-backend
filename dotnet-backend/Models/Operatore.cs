namespace dotnet_backend.Models;

public class Operatore
{
    public int? id { get; set; }
    public string? ruolo { get; set; }
    public string? nome { get; set; }
    public string? cognome { get; set; }
    public string? username { get; set; }
    public string? password { get; set; }
    public int sede_id { get; set; }

}