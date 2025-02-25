using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class ReservasBL
    {
        public List<ReservasCLS> listarReservas()
        {
            ReservasDAL obj = new ReservasDAL();

            return obj.listarReservas();
        }
    }
}
