using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace Alquiler_de_Vehiculos.Controllers
{
    public class ReservasController : Controller
    {
        public IActionResult Index()
        {
            ReservaBL obj = new ReservaBL();
            var reservas = obj.listarReservas();
            return View(reservas);
        }

        public List<ReservaCLS> listarReservas()
        {
            ReservaBL obj = new ReservaBL();

            return obj.listarReservas();
        }

        public List<ReservaCLS> filtrarReservas(ReservaCLS objReservas)
        {
            ReservaBL obj = new ReservaBL();
            return obj.filtrarReservas(objReservas);
        }

        public int guardarReservas(ReservaCLS obj)
        {
            ReservaBL oReservas = new ReservaBL();
            return oReservas.guardarReservas(obj);
        }
    }
}
