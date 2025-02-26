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
                                        idCliente = drd.GetInt32(0),
                                        nombre = drd.GetString(1),
                                        apellido = drd.GetString(2),
                                        telefono = drd.GetString(3),
                                        email = drd.GetString(4)
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

        public int GuargarCliente(ClienteCLS oCliente)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspGuardarCliente", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@nombre", oCliente.nombre));
                        cmd.Parameters.Add(new SqlParameter("@apellido", oCliente.apellido));
                        cmd.Parameters.Add(new SqlParameter("@telefono", oCliente.telefono));
                        cmd.Parameters.Add(new SqlParameter("@email", oCliente.email));
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

        public ClienteCLS FiltrarClientes(int idCliente)
        {
            ClienteCLS oCliente = new ClienteCLS();
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarCliente", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.Add(new SqlParameter("@idCliente", idCliente));
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            drd.Read();
                            oCliente.idCliente = drd.GetInt32(0);
                            oCliente.nombre = drd.GetString(1);
                            oCliente.apellido = drd.GetString(2);
                            oCliente.telefono = drd.GetString(3);
                            oCliente.email = drd.GetString(4);
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

        public List<ClienteCLS> FiltrarCliente(ClienteDAL objCliente)
        {
            throw new NotImplementedException();
        }
    }
    }