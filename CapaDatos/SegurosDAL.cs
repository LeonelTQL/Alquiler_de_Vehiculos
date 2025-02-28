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
    public class SegurosDAL : ConexionDAL
    {
        public List<SegurosCLS> listarSeguros()
        {
            List<SegurosCLS> lista = new List<SegurosCLS>();
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspListarSeguros", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            while (drd.Read())
                            {
                                SegurosCLS oSeguro = new SegurosCLS()
                                {
                                    idSeguro= drd.GetInt32(0),
                                    reservaId = drd.GetInt32(1),
                                    nombreCliente = drd.GetString(2),
                                    vehiculo = drd.GetString(3),
                                    tipoSeguro = drd.GetString(4),
                                    costo = drd.GetDecimal(5),
                                };
                                lista.Add(oSeguro);
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

        public List<SegurosCLS> filtrarSeguros(SegurosCLS obj)
        {
            List<SegurosCLS> lista = new List<SegurosCLS>();

            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                try
                {
                    cn.Open();
                    using (SqlCommand cmd = new SqlCommand("uspFiltrarSeguros", cn))
                    {
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;



                        string termino = string.IsNullOrEmpty(obj.terminoBusqueda) ? "%" : obj.terminoBusqueda;
                        cmd.Parameters.AddWithValue("@terminoBusqueda", termino);

                        SqlDataReader dr = cmd.ExecuteReader();
                        if (dr.HasRows)
                        {
                            while (dr.Read())
                            {
                                SegurosCLS Seguros = new SegurosCLS
                                {
                                    idSeguro = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                    reservaId = dr.IsDBNull(1) ? 0 : dr.GetInt32(1),
                                    nombreCliente = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                    vehiculo = dr.IsDBNull(3) ? "" : dr.GetString(3),
                                    tipoSeguro = dr.IsDBNull(3) ? "" : dr.GetString(4),
                                    costo= dr.IsDBNull(4) ? 0 : dr.GetDecimal(5)
                                };
                                lista.Add(Seguros);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception("Error al filtrar seguro: " + ex.Message);
                }
            }
            return lista;
        }

        public int eliminarSeguros(int idSeguro)
        {
            int rpta = 0;
            using (SqlConnection cn = new SqlConnection(cadenaDato))
            {
                cn.Open();
                try
                {
                    using (SqlCommand cmd = new SqlCommand("uspEliminarSeguro", cn))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@id", idSeguro);
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
