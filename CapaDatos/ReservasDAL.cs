using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CapaDatos
{
    public class ReservasDAL: ConexionDAL
    {
        public List<ReservasCLS> listarReservas()
        {
            List<ReservasCLS> lista = new List<ReservasCLS>();
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
                                ReservasCLS oReserva = new ReservasCLS()
                                {
                                    idReservas = drd.GetInt32(0),
                                    nombreCliente = drd.GetString(1),
                                    vehiculo = drd.GetString(2),
                                    fechaInicio = drd.IsDBNull(3) ? DateTime.Now : drd.GetDateTime(3),
                                    fechaFin = drd.IsDBNull(4) ? default(DateTime) : drd.GetDateTime(4),
                                    estado = drd.GetString(5)
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

        public List<ReservasCLS> filtrarReservas(ReservasCLS obj)
        {
            List<ReservasCLS> lista = new List<ReservasCLS>();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarReservas", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;



                        string termino = string.IsNullOrEmpty(obj.terminoBusqueda) ? "%" : obj.terminoBusqueda;
                        cmd.Parameters.AddWithValue("@terminoBusqueda", termino);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                ReservasCLS reserva = new ReservasCLS
                                {
                                    idReservas = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                    nombreCliente = dr.IsDBNull(1) ? "" : dr.GetString(1),
                                    vehiculo = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                    fechaInicio = dr.IsDBNull(3) ? DateTime.Now : dr.GetDateTime(3),
                                    fechaFin = dr.IsDBNull(4) ? default(DateTime) : dr.GetDateTime(4),
                                    estado = dr.IsDBNull(5) ? "" : dr.GetString(5)
                                };
                                lista.Add(reserva);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al filtrar reservas: " + ex.Message);
                }
            }
            return lista;
        }

        public int guardarReservas(ReservasCLS oReservaCLS)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspGuardarReserva", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oReservaCLS.idReservas);
                        cmd.Parameters.AddWithValue("@clienteId", oReservaCLS.idCliente);
                        cmd.Parameters.AddWithValue("@vehiculoId", oReservaCLS.idVehiculo);
                        cmd.Parameters.AddWithValue("@fechaInicio", oReservaCLS.fechaInicio);
                        cmd.Parameters.AddWithValue("@fechaFin", oReservaCLS.fechaFin);
                        cmd.Parameters.AddWithValue("@estado", oReservaCLS.estado);
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

        public int eliminarReservas(int idReserva)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspEliminarReserva", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idReserva);
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
        public ReservasCLS recuperarReservas(int idReserva)
        {
            ReservasCLS oReservasCLS = null;

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarReserva", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idReserva);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr != null && dr.Read())
                        {
                            oReservasCLS = new ReservasCLS
                            {
                                idReservas = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                idCliente = dr.IsDBNull(1) ? 0 : dr.GetInt32(1),
                                idVehiculo = dr.IsDBNull(2) ? 0 : dr.GetInt32(2),
                                fechaInicio = dr.IsDBNull(3) ? DateTime.Now : dr.GetDateTime(3),
                                fechaFin = dr.IsDBNull(4) ? default(DateTime) : dr.GetDateTime(4),
                                estado = dr.IsDBNull(5) ? "" : dr.GetString(5)
                            };
                        }
                    }
                }
                catch (Exception)
                {
                    cn.Close();
                    oReservasCLS = null;
                }
            }
            return oReservasCLS;
        }
    }
}
