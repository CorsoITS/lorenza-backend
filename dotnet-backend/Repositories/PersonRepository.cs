using dotnet_backend.Context;
using dotnet_backend.Models;
using MySql.Data.MySqlClient;

namespace dotnet_backend.Repositories;

public class PersonRepository
{

    private AppDb appDb = new AppDb();

    public IEnumerable<Persona> GetPeople()
    {
        var result = new List<Persona>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id,nome, cognome, codice_fiscale from persona";
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var person = new Persona()
            {
                id = reader.GetInt16("id"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),
                codice_fiscale = reader.GetString("codice_fiscale")
            };
            result.Add(person);
        }
        appDb.Connection.Close();

        return result;
    }

    public Persona GetPerson(int? id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id,nome, cognome, codice_fiscale from persona where id=@id";
        var parameter = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = id
        };
        command.Parameters.Add(parameter);
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var person = new Persona()
            {
                id = reader.GetInt16("id"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),
                codice_fiscale = reader.GetString("codice_fiscale")
            };
            appDb.Connection.Close();
            return person;
        }
        
        appDb.Connection.Close();
        return null;
    }

    public bool Create(Persona person)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "insert into persona (nome, cognome, codice_fiscale) values (@nome,@cognome, @codice_fiscale)";
        var parameterName = new MySqlParameter()
        {
            ParameterName = "nome",
            DbType = System.Data.DbType.String,
            Value = person.nome
        };
        command.Parameters.Add(parameterName);
        var parameterSurname = new MySqlParameter()
        {
            ParameterName = "cognome",
            DbType = System.Data.DbType.String,
            Value = person.cognome
        };
        command.Parameters.Add(parameterSurname);
        var parameterCodFis = new MySqlParameter()
        {
            ParameterName = "codice_fiscale",
            DbType = System.Data.DbType.String,
            Value = person.codice_fiscale
        };
        command.Parameters.Add(parameterCodFis);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Update(Persona person)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "update persona set nome=@nome,cognome=@cognome, codice_fiscale=@codice_fiscale where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = person.id
        };
        command.Parameters.Add(parameterId);
        var parameterName = new MySqlParameter()
        {
            ParameterName = "nome",
            DbType = System.Data.DbType.String,
            Value = person.nome
        };
        command.Parameters.Add(parameterName);
        var parameterSurname = new MySqlParameter()
        {
            ParameterName = "cognome",
            DbType = System.Data.DbType.String,
            Value = person.cognome
        };
        command.Parameters.Add(parameterSurname);
        var parameterCodFis = new MySqlParameter()
        {
            ParameterName = "codice_fiscale",
            DbType = System.Data.DbType.String,
            Value = person.codice_fiscale
        };
        command.Parameters.Add(parameterCodFis);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }
    //     var result = Convert.ToBoolean(command.ExecuteNonQuery());
    //     appDb.Connection.Close();
    //     return result;
    // }

    public bool Delete(int id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "delete from persona where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = id
        };
        command.Parameters.Add(parameterId);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

}