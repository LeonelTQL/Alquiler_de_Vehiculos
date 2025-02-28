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
                                    fechaPago = DateOnly.FromDateTime(drd.GetDateTime(6))
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
                                    metodoPago = dr.IsDBNull(3) ? "" : dr.GetString(5),
                                    fechaPago = dr.IsDBNull(4) ? new DateOnly() : DateOnly.FromDateTime(dr.GetDateTime(6))
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
    }
}
