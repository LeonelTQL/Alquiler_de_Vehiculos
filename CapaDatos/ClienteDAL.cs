using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaEntidad;

namespace CapaDatos
{
    public class ClienteDAL : ConexionDAL
    {
            public List<ClienteCLS> listarCliente()
            {
                List<ClienteCLS> lista = new List<ClienteCLS>();
                using (SqlConnection cn = new SqlConnection(cadenaDato))
                {
                    cn.Open();
                    try
                    {
                        using (SqlCommand cmd = new SqlCommand("uspListarReservas", cn))
                        {
                            cmd.CommandType = CommandType.StoredProcedure;
                            SqlDataReader drd = cmd.ExecuteReader();
                            if (drd != null)
                            {
                                while (drd.Read())
                                {
                                    ClienteCLS oReserva = new ClienteCLS()
                                    {
                                        IdCliente = drd.GetInt32(0),
                                        Nombre = drd.GetString(1),
                                        Apellido = drd.GetString(2),
                                        Telefono = drd.GetString(3),
                                        Email = drd.GetString(4),
                                    };
                                    lista.Add(oReserva);
                                }
                            }
                        }
                    }
                    catch (Exception)
                    {
                        lista = null;
                    }
                }
                return lista;
            }

        public int AgregarCliente(ClienteCLS oCliente)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspAgregarCliente", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@nombre", oCliente.Nombre));
                        cmd.Parameters.Add(new SqlParameter("@apellido", oCliente.Apellido));
                        cmd.Parameters.Add(new SqlParameter("@telefono", oCliente.Telefono));
                        cmd.Parameters.Add(new SqlParameter("@email", oCliente.Email));
                        rpta = cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception)
                {
                    rpta = 0;
                }
            }
            return rpta;
        }
        public int EliminarCliente(int idCliente)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspEliminarCliente", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@idCliente", idCliente));
                        rpta = cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception)
                {
                    rpta = 0;
                }
            }
            return rpta;
        }

        public ClienteCLS ObtenerCliente(int idCliente)
        {
            ClienteCLS oCliente = new ClienteCLS();
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspObtenerCliente", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@idCliente", idCliente));
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            drd.Read();
                            oCliente.IdCliente = drd.GetInt32(0);
                            oCliente.Nombre = drd.GetString(1);
                            oCliente.Apellido = drd.GetString(2);
                            oCliente.Telefono = drd.GetString(3);
                            oCliente.Email = drd.GetString(4);
                        }
                    }
                }
                catch (Exception)
                {
                    oCliente = null;
                }
            }
            return oCliente;
        }
    }
    }