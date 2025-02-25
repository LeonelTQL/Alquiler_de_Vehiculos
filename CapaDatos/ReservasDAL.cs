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
                                    fechaInicio = DateOnly.FromDateTime(drd.GetDateTime(3)),
                                    fechaFin = DateOnly.FromDateTime(drd.GetDateTime(4)),
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
    }
}
