using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class ReservaBL
    {
        public List<ReservaCLS> listarReservas()
        {
            ReservasDAL obj = new ReservasDAL();

            return obj.listarReservas();
        }

        public List<ReservaCLS> filtrarReservas(ReservaCLS objReservas)
        {
            ReservasDAL obj = new ReservasDAL();
            return obj.filtrarReservas(objReservas);
        }

        public int guardarReservas(ReservaCLS obj)
        {
            ReservasDAL oTipoMedicamentoDAL = new ReservasDAL();
            return oTipoMedicamentoDAL.guardarReservas(obj);
        }
    }
}
