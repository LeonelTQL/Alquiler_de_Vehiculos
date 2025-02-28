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
        public List<ClienteCLS> listarClientes()
        {
            List<ClienteCLS> lista = new List<ClienteCLS>();
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspListarClientes", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            while (drd.Read())
                            {
                                ClienteCLS oCliente = new ClienteCLS()
                                {
                                    idCliente = drd.GetInt32(0),
                                    nombre = drd.GetString(1),
                                    apellido = drd.GetString(2),
                                    telefono = drd.GetString(3),
                                    email = drd.GetString(4)
                                };
                                lista.Add(oCliente);
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

        public List<ClienteCLS> filtrarClientes(ClienteCLS obj)
        {
            List<ClienteCLS > lista = new List<ClienteCLS>();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarClientes", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;



                        string termino = string.IsNullOrEmpty(obj.terminoBusqueda) ? "%" : obj.terminoBusqueda;
                        cmd.Parameters.AddWithValue("@terminoBusqueda", termino);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                ClienteCLS cliente = new ClienteCLS
                                {
                                    idCliente = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                    nombre= dr.IsDBNull(1) ? "" : dr.GetString(1),
                                    apellido = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                    telefono = dr.IsDBNull(3) ? "" : dr.GetString(3),
                                    email = dr.IsDBNull(4) ? "" : dr.GetString(4)
                                };
                                lista.Add(cliente);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al filtrar clientes: " + ex.Message);
                }
            }
            return lista;
        }

        public int guardarClientes(ClienteCLS oClienteCLS)
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

                        cmd.Parameters.AddWithValue("@id", oClienteCLS.idCliente);
                        cmd.Parameters.AddWithValue("@nombre", oClienteCLS.nombre);
                        cmd.Parameters.AddWithValue("@apellido", oClienteCLS.apellido);
                        cmd.Parameters.AddWithValue("@telefono", oClienteCLS.telefono);
                        cmd.Parameters.AddWithValue("@email", oClienteCLS.email);

                        rpta = cmd.ExecuteNonQuery();
                    }
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Error: " + ex.Message);
                }
            }
            return rpta;
        }
        public int eliminarClientes(int idCliente)
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
                        cmd.Parameters.AddWithValue("@id", idCliente);
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


        public ClienteCLS recuperarClientes(int idCliente)
        {
            ClienteCLS oClienteCLS = null;

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarCliente", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idCliente);

                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null && drd.Read())
                        {
                            oClienteCLS = new ClienteCLS
                            {
                                idCliente = drd.IsDBNull(0) ? 0 : drd.GetInt32(0),
                                nombre = drd.IsDBNull(1) ? "" : drd.GetString(1),
                                apellido = drd.IsDBNull(2) ? "" : drd.GetString(2),
                                telefono = drd.IsDBNull(3) ? "" : drd.GetString(3),
                                email = drd.IsDBNull(4) ? "" : drd.GetString(4)
                            };
                        }
                    }
                }
                catch (Exception)
                {
                    cn.Close();
                    oClienteCLS = null;
                }
            }
            return oClienteCLS;
        }
    }
}