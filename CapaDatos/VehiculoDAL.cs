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
    public class VehiculoDAL : ConexionDAL
    {
        public List<VehiculoCLS> listarVehiculos()
        {
            List<VehiculoCLS> lista = new List<VehiculoCLS>();
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspListarVehiculos", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            while (drd.Read())
                            {
                                VehiculoCLS oVehiculo = new VehiculoCLS()
                                {
                                    idVehiculo = drd.GetInt32(0),
                                    marca = drd.GetString(1),
                                    modelo = drd.GetString(2),
                                    anio = drd.GetInt32(3),
                                    precio = drd.GetDecimal(4),
                                    estado = drd.GetString(5)
                                };
                                lista.Add(oVehiculo);
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

        public List<VehiculoCLS> filtrarVehiculos(VehiculoCLS obj)
        {
            List<VehiculoCLS> lista = new List<VehiculoCLS>();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarVehiculos", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;



                        string termino = string.IsNullOrEmpty(obj.terminoBusqueda) ? "%" : obj.terminoBusqueda;
                        cmd.Parameters.AddWithValue("@terminoBusqueda", termino);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                VehiculoCLS Vehiculo = new VehiculoCLS
                                {
                                    idVehiculo = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                    marca = dr.IsDBNull(1) ? "" : dr.GetString(1),
                                    modelo = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                    anio = dr.IsDBNull(3) ? 0 : dr.GetInt32(3),
                                    precio = dr.IsDBNull(4) ? 0 : dr.GetDecimal(4),
                                    estado = dr.IsDBNull(5) ? "" : dr.GetString(5)
                                };
                                lista.Add(Vehiculo);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al filtrar Vehiculo: " + ex.Message);
                }
            }
            return lista;
        }

        public int guardarVehiculos(VehiculoCLS oVehiculoCLS)
        {
            int rpta = 0;

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspGuardarVehiculo", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@id", oVehiculoCLS.idVehiculo);
                        cmd.Parameters.AddWithValue("@marca", oVehiculoCLS.marca);
                        cmd.Parameters.AddWithValue("@modelo", oVehiculoCLS.modelo);
                        cmd.Parameters.AddWithValue("@año", oVehiculoCLS.anio);
                        cmd.Parameters.AddWithValue("@precio", oVehiculoCLS.precio);
                        cmd.Parameters.AddWithValue("@estado", oVehiculoCLS.estado);

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
        public int eliminarVehiculos(int idVehiculo)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspEliminarVehiculo", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idVehiculo);
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

        public VehiculoCLS recuperarVehiculos(int idVehiculo)
        {
            VehiculoCLS oVehiculoCLS = null;

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarVehiculo", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idVehiculo);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr != null && dr.Read())
                        {
                            oVehiculoCLS = new VehiculoCLS
                            {
                                idVehiculo = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                marca = dr.IsDBNull(1) ? "" : dr.GetString(1),
                                modelo = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                anio = dr.IsDBNull(3) ? 0 : dr.GetInt32(3),
                                precio = dr.IsDBNull(4) ? 0 : dr.GetDecimal(4),
                                estado = dr.IsDBNull(5) ? "" : dr.GetString(5)
                            };
                        }
                    }
                }
                catch (Exception)
                {
                    cn.Close();
                    oVehiculoCLS = null;
                }
            }
            return oVehiculoCLS;
        }
    }
}
