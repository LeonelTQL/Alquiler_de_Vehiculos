using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace Alquiler_de_Vehiculos.Controllers
{
    public class ReservasController : Controller
    {
        public IActionResult Index()
        {
            ReservasBL obj = new ReservasBL();
            var reservas = obj.listarReservas();
            return View(reservas);
        }

        public List<ReservasCLS> listarReservas()
        {
            ReservasBL obj = new ReservasBL();

            return obj.listarReservas();
        }
    }
}
