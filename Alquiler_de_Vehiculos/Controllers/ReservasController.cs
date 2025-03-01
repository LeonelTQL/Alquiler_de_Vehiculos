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

        public List<ReservasCLS> filtrarReservas(ReservasCLS objReservas)
        {
            ReservasBL obj = new ReservasBL();
            return obj.filtrarReservas(objReservas);
        }

        public int guardarReservas(ReservasCLS obj)
        {
            ReservasBL oReservas = new ReservasBL();
            return oReservas.guardarReservas(obj);
        }
        public int eliminarReservas(int id)
        {
            ReservasBL obj = new ReservasBL();
            return obj.eliminarReservas(id);
        }
        public ReservasCLS recuperarReservas(int idReserva)
        {
            ReservasBL obj = new ReservasBL();
            return obj.recuperarReservas(idReserva);
        }

    }
}
