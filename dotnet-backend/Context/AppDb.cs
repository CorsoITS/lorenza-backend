using MySql.Data.MySqlClient;

namespace dotnet_backend.Context;

public class AppDb
{

    public MySqlConnection Connection { get; }

    private const string defaultConnectionString = "server=localhost;database=piattaforma_vaccini_v2;uid=root;pwd=Lore.manu.7707;";

    public AppDb()
    {
        Connection = new MySqlConnection(defaultConnectionString);
    }
    public AppDb(string connectionString)
    {
        Connection = new MySqlConnection(connectionString);
    }



}