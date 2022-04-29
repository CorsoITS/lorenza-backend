using dotnet_backend.Context;
using dotnet_backend.Models;
using MySql.Data.MySqlClient;

namespace dotnet_backend.Repositories;

public class SomministrazioneRepository
{

    private AppDb appDb = new AppDb();

    public IEnumerable<Somministrazione> GetSomministrazioni()
    {
        var result = new List<Somministrazione>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id, vaccino, dose, data_somministrazione, note, opertore_id, persona_id from somministrazione";
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var somministrazione = new Somministrazione()
            {
                id = reader.GetInt16("id"),
                vaccino = reader.GetString("vaccino"),
                dose = reader.GetString("dose"),
                data_somministrazione = reader.GetDateTime("data_somministrazione"),                
                note = reader.GetString("note"),
                opertore_id = reader.GetInt16("opertore_id"),
                persona_id = reader.GetInt16("persona_id")
            };
            result.Add(somministrazione);
        }
        appDb.Connection.Close();

        return result;
    }
        public IEnumerable<Somministrazione> GetSomministrazioniVaccino(string? vaccino)
    {
        var result = new List<Somministrazione>();

        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id,vaccino, dose, data_somministrazione, note, opertore_id, persona_id from somministrazione where vaccino = @vaccino";
        var parameter = new MySqlParameter()
        {
            ParameterName = "vaccino",
            DbType = System.Data.DbType.String,
            Value = vaccino
        };
        command.Parameters.Add(parameter);
        var reader = command.ExecuteReader();

        while (reader.Read())
        {
            var somministrazione = new Somministrazione()
            {
                id = reader.GetInt16("id"),
                vaccino = reader.GetString("vaccino"),
                dose = reader.GetString("dose"),
                data_somministrazione = reader.GetDateTime("data_somministrazione"),                
                note = reader.GetString("note"),
                opertore_id = reader.GetInt16("opertore_id"),
                persona_id = reader.GetInt16("persona_id")
            };
            result.Add(somministrazione);
        }
        appDb.Connection.Close();

        return result;
    }

    public Somministrazione GetSomministrazione(int? id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "select id,vaccino, dose, data_somministrazione, note, opertore_id, persona_id from somministrazione where id=@id";
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
            var somministrazione = new Somministrazione()
            {
                id = reader.GetInt16("id"),
                vaccino = reader.GetString("vaccino"),
                dose = reader.GetString("dose"),
                data_somministrazione = reader.GetDateTime("data_somministrazione"),                
                note = reader.GetString("note"),
                opertore_id = reader.GetInt16("opertore_id"),
                persona_id = reader.GetInt16("persona_id")
            };
            appDb.Connection.Close();
            return somministrazione;
        }

        appDb.Connection.Close();
        return null;
    }

    public bool Create(Somministrazione somministrazione)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "insert into somministrazione (vaccino, dose, data_somministrazione, note, opertore_id, persona_id) values (@vaccino, @dose, @data_somministrazione, @note, @opertore_id, @persona_id)";
        var parameterVaccino = new MySqlParameter()
        {
            ParameterName = "vaccino",
            DbType = System.Data.DbType.String,
            Value = somministrazione.vaccino
        };
        command.Parameters.Add(parameterVaccino);
        var parameterDose = new MySqlParameter()
        {
            ParameterName = "dose",
            DbType = System.Data.DbType.String,
            Value = somministrazione.dose
        };
        command.Parameters.Add(parameterDose);
        var parameterDataSomministrazione = new MySqlParameter()
        {
            ParameterName = "data_somministrazione",
            DbType = System.Data.DbType.DateTime,
            Value = somministrazione.data_somministrazione
        };
        command.Parameters.Add(parameterDataSomministrazione);
        var parameterNote = new MySqlParameter()
        {
            ParameterName = "note",
            DbType = System.Data.DbType.String,
            Value = somministrazione.note
        };
        command.Parameters.Add(parameterNote);
        var parameterOperatoreId = new MySqlParameter()
        {
            ParameterName = "opertore_id",
            DbType = System.Data.DbType.Int16,
            Value = somministrazione.opertore_id
        };
        command.Parameters.Add(parameterOperatoreId);
        var parameterPersonaId = new MySqlParameter()
        {
            ParameterName = "persona_id",
            DbType = System.Data.DbType.Int16,
            Value = somministrazione.persona_id
        };
        command.Parameters.Add(parameterPersonaId);
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Update(Somministrazione somministrazione)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "update somministrazione set vaccino=@vaccino, dose=@dose, data_somministrazione=@data_somministrazione, note=@note, opertore_id=@opertore_id, persona_id=@persona_id where id=@id";
        var parameterId = new MySqlParameter()
        {
            ParameterName = "id",
            DbType = System.Data.DbType.Int16,
            Value = somministrazione.id
        };
        command.Parameters.Add(parameterId);
                var parameterVaccino = new MySqlParameter()
        {
            ParameterName = "vaccino",
            DbType = System.Data.DbType.String,
            Value = somministrazione.vaccino
        };
        command.Parameters.Add(parameterVaccino);
        var parameterDose = new MySqlParameter()
        {
            ParameterName = "dose",
            DbType = System.Data.DbType.String,
            Value = somministrazione.dose
        };
        command.Parameters.Add(parameterDose);
        var parameterDataSomministrazione = new MySqlParameter()
        {
            ParameterName = "data_somministrazione",
            DbType = System.Data.DbType.DateTime,
            Value = somministrazione.data_somministrazione
        };
        command.Parameters.Add(parameterDataSomministrazione);
        var parameterNote = new MySqlParameter()
        {
            ParameterName = "note",
            DbType = System.Data.DbType.String,
            Value = somministrazione.note
        };
        command.Parameters.Add(parameterNote);
        var parameterOperatoreId = new MySqlParameter()
        {
            ParameterName = "opertore_id",
            DbType = System.Data.DbType.Int16,
            Value = somministrazione.opertore_id
        };
        command.Parameters.Add(parameterOperatoreId);
        var parameterPersonaId = new MySqlParameter()
        {
            ParameterName = "persona_id",
            DbType = System.Data.DbType.Int16,
            Value = somministrazione.persona_id
        };
        command.Parameters.Add(parameterPersonaId);
       
        var result = Convert.ToBoolean(command.ExecuteNonQuery());
        appDb.Connection.Close();
        return result;
    }

    public bool Delete(int id)
    {
        appDb.Connection.Open();
        var command = appDb.Connection.CreateCommand();
        command.CommandText = "delete from somministrazione where id=@id";
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