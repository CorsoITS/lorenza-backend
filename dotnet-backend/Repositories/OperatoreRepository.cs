using dotnet_backend.Context;
using dotnet_backend.Models;
using MySql.Data.MySqlClient;

namespace dotnet_backend.Repositories;

public class OperatoreRepository
{

    private AppDb appDb = new AppDb();

    public IEnumerable<Operatore> GetOperatori()
    {
        var result = new List<Operatore>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id,ruolo, nome, cognome, username, password, sede_id from operatore";
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var operatore = new Operatore()
            {
                id = reader.GetInt16("id"),
                ruolo = reader.GetString("ruolo"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),                
                username = reader.GetString("username"),
                password = reader.GetString("password"),
                sede_id = reader.GetString("sede_id")
            };
            result.Add(operatore);
        }
        appDb.Connection.Close();

        return result;
    }

    public Operatore GetOperatore(int? id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id, ruolo, nome, cognome, username, password, sede_id from operatore where id=@id";
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
            var operatore = new Operatore()
            {
                id = reader.GetInt16("id"),
                ruolo = reader.GetString("ruolo"),
                nome = reader.GetString("nome"),
                cognome = reader.GetString("cognome"),
                username = reader.GetString("username"),
                password = reader.GetString("password"),
                sede_id = reader.GetString("sede_id")
            };
            appDb.Connection.Close();
            return operatore;
        }

        appDb.Connection.Close();
        return null;
    }

    public bool Create(Operatore operatore)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "insert into operatore (ruolo, nome, cognome, username, password, sede_id) values (@ruolo, @nome,@cognome, @username,@password, @sede_id)";
        var parameterRuolo = new MySqlParameter()
        {
            ParameterName = "ruolo",
            DbType = System.Data.DbType.String,
            Value = operatore.ruolo
        };
        command.Parameters.Add(parameterRuolo);
        var parameterName = new MySqlParameter()
        {
            ParameterName = "nome",
            DbType = System.Data.DbType.String,
            Value = operatore.nome
        };
        command.Parameters.Add(parameterName);
        var parameterSurname = new MySqlParameter()
        {
            ParameterName = "cognome",
            DbType = System.Data.DbType.String,
            Value = operatore.cognome
        };
        command.Parameters.Add(parameterSurname);
        var parameterUsername = new MySqlParameter()
        {
            ParameterName = "username",
            DbType = System.Data.DbType.String,
            Value = operatore.username
        };
        command.Parameters.Add(parameterUsername);
                var parameterPassword = new MySqlParameter()
        {
            ParameterName = "password",
            DbType = System.Data.DbType.String,
            Value = operatore.password
        };
        command.Parameters.Add(parameterPassword);
        var parameterSedeId = new MySqlParameter()
        {
            ParameterName = "sede_id",
            DbType = System.Data.DbType.String,
            Value = operatore.sede_id
        };
        command.Parameters.Add(parameterSedeId);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Update(Operatore operatore)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "update operatore set ruolo=@ruolo, nome=@nome,cognome=@cognome, username=@username, password=@password, sede_id=@sede_id where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = operatore.id
        };
        command.Parameters.Add(parameterId);
        var parameterRuolo = new MySqlParameter()
        {
            ParameterName = "ruolo",
            DbType = System.Data.DbType.String,
            Value = operatore.ruolo
        };
        command.Parameters.Add(parameterRuolo);
        var parameterName = new MySqlParameter()
        {
            ParameterName = "nome",
            DbType = System.Data.DbType.String,
            Value = operatore.nome
        };
        command.Parameters.Add(parameterName);
        var parameterSurname = new MySqlParameter()
        {
            ParameterName = "cognome",
            DbType = System.Data.DbType.String,
            Value = operatore.cognome
        };
        command.Parameters.Add(parameterSurname);
        var parameterUsername = new MySqlParameter()
        {
            ParameterName = "username",
            DbType = System.Data.DbType.String,
            Value = operatore.username
        };
        command.Parameters.Add(parameterUsername);
                var parameterPassword = new MySqlParameter()
        {
            ParameterName = "password",
            DbType = System.Data.DbType.String,
            Value = operatore.password
        };
        command.Parameters.Add(parameterPassword);
        var parameterSedeId = new MySqlParameter()
        {
            ParameterName = "sede_id",
            DbType = System.Data.DbType.String,
            Value = operatore.sede_id
        };
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Delete(int id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "delete from operatore where id=@id";
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