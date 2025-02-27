using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class EmpleadosDAL: ConexionDAL
    {
        public List<EmpleadosCLS> listarEmpleados()
        {
            List<EmpleadosCLS> lista = new List<EmpleadosCLS>();
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspListarEmpleados", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            while (drd.Read())
                            {
                                EmpleadosCLS oEmpleado = new EmpleadosCLS()
                                {
                                    idEmpleado = drd.GetInt32(0),
                                    nombre = drd.GetString(1),
                                    apellido = drd.GetString(2),
                                    cargo = drd.GetString(3),
                                    telefono = drd.GetString(4),
                                    email = drd.GetString(5)
                                };
                                lista.Add(oEmpleado);
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

        public List<EmpleadosCLS> filtrarEmpleados(EmpleadosCLS obj)
        {
            List<EmpleadosCLS> lista = new List<EmpleadosCLS>();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarEmpleados", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;



                        string termino = string.IsNullOrEmpty(obj.terminoBusqueda) ? "%" : obj.terminoBusqueda;
                        cmd.Parameters.AddWithValue("@terminoBusqueda", termino);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                EmpleadosCLS empleado = new EmpleadosCLS
                                {
                                    idEmpleado = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                    nombre = dr.IsDBNull(1) ? "" : dr.GetString(1),
                                    apellido = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                    cargo = dr.IsDBNull(3) ? "" : dr.GetString(3),
                                    telefono = dr.IsDBNull(3) ? "" : dr.GetString(4),
                                    email = dr.IsDBNull(4) ? "" : dr.GetString(5)
                                };
                                lista.Add(empleado);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al filtrar Empleados: " + ex.Message);
                }
            }
            return lista;
        }

        public int guardarEmpleados(EmpleadosCLS oEmpleadosCLS)
        {
            int rpta = 0;

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspGuardarEmpleado", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@id", oEmpleadosCLS.idEmpleado);
                        cmd.Parameters.AddWithValue("@nombre", oEmpleadosCLS.nombre);
                        cmd.Parameters.AddWithValue("@apellido", oEmpleadosCLS.apellido);
                        cmd.Parameters.AddWithValue("@cargo", oEmpleadosCLS.cargo);
                        cmd.Parameters.AddWithValue("@telefono", oEmpleadosCLS.telefono);
                        cmd.Parameters.AddWithValue("@email", oEmpleadosCLS.email);

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
        public int eliminarEmpleados(int idEmpleado)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspEliminarEmpleado", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idEmpleado);
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
    }
}
