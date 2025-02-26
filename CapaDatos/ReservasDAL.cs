﻿using CapaEntidad;
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
        public List<ClienteCLS> listarReservas()
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

        public List<ReservaCLS> filtrarReservas(ReservaCLS obj)
        {
            List<ReservaCLS> lista = new List<ReservaCLS>();

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
                                ReservaCLS reserva = new ReservaCLS
                                {
                                    idReservas = dr.IsDBNull(0) ? 0 : dr.GetInt32(0),
                                    nombreCliente = dr.IsDBNull(1) ? "" : dr.GetString(1),
                                    vehiculo = dr.IsDBNull(2) ? "" : dr.GetString(2),
                                    fechaInicio = dr.IsDBNull(3) ? new DateOnly() : DateOnly.FromDateTime(dr.GetDateTime(3)),
                                    fechaFin = dr.IsDBNull(4) ? new DateOnly() : DateOnly.FromDateTime(dr.GetDateTime(4)),
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

        public int guardarReservas(ReservaCLS oReservaCLS)
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
    }
}
