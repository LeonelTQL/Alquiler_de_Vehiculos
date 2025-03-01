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
    public class PagosDAL: ConexionDAL
    {
        public List<PagosCLS> listarPagos()
        {
            List<PagosCLS> lista = new List<PagosCLS>();
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspListarPagos", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            while (drd.Read())
                            {
                                PagosCLS oPago = new PagosCLS()
                                {
                                    idPago = drd.GetInt32(0),
                                    reservaId = drd.GetInt32(1),
                                    nombreCliente = drd.GetString(2),
                                    vehiculo = drd.GetString(3),
                                    monto = drd.GetDecimal(4),
                                    metodoPago = drd.GetString(5),
                                    fechaPago = drd.IsDBNull(6) ? DateTime.Now : drd.GetDateTime(6)
                                };
                                lista.Add(oPago);
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

        public List<PagosCLS> filtrarPagos(PagosCLS obj)
        {
            List<PagosCLS> lista = new List<PagosCLS>();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarPagos", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;



                        string termino = string.IsNullOrEmpty(obj.terminoBusqueda) ? "%" : obj.terminoBusqueda;
                        cmd.Parameters.AddWithValue("@terminoBusqueda", termino);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                PagosCLS pagos = new PagosCLS
                                {
                                    idPago = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                    reservaId = dr.IsDBNull(1) ? 0 : dr.GetInt32(1),
                                    nombreCliente = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                    vehiculo = dr.IsDBNull(3) ? "" : dr.GetString(3),
                                    monto = dr.IsDBNull(4) ? 0 : dr.GetDecimal(4),
                                    metodoPago = dr.IsDBNull(5) ? "" : dr.GetString(5),
                                    fechaPago = dr.IsDBNull(6) ? DateTime.Now : dr.GetDateTime(6)
                                };
                                lista.Add(pagos);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al filtrar Pagos: " + ex.Message);
                }
            }
            return lista;
        }
        public int guardarPagos(PagosCLS oPagosCLS)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspGuardarPago", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", oPagosCLS.idPago);
                        cmd.Parameters.AddWithValue("@reservaId", oPagosCLS.reservaId);
                        cmd.Parameters.AddWithValue("@monto", oPagosCLS.monto);
                        cmd.Parameters.AddWithValue("@metodoPago", oPagosCLS.metodoPago);
                        cmd.Parameters.AddWithValue("@fechaPago", oPagosCLS.fechaPago);
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
        public int eliminarPagos(int idPagos)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspEliminarPago", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idPagos);
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
        public PagosCLS recuperarPagos(int idPagos)
        {
            PagosCLS oPagosCLS = null;

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspRecuperarPago", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idPagos);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr != null && dr.Read())
                        {
                            oPagosCLS = new PagosCLS
                            {
                                idPago = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                reservaId = dr.IsDBNull(1) ? 0 : dr.GetInt32(1),
                                monto = dr.IsDBNull(2) ? 0 : dr.GetDecimal(2),
                                metodoPago = dr.IsDBNull(3) ? "" : dr.GetString(3),
                                fechaPago = dr.IsDBNull(4) ? DateTime.Now : dr.GetDateTime(4)
                                
                            };
                        }
                    }
                }
                catch (Exception)
                {
                    cn.Close();
                    oPagosCLS = null;
                }
            }
            return oPagosCLS;
        }
    }
}
