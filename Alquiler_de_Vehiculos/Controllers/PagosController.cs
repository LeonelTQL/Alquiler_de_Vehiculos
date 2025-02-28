using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace Alquiler_de_Vehiculos.Controllers
{
    public class PagosController : Controller
    {
        public IActionResult Index()
        {
            PagosBL obj = new PagosBL();
            var Pagos = obj.listarPagos();
            return View(Pagos);
        }
        public List<PagosCLS> listarPagos()
        {
            PagosBL obj = new PagosBL();

            return obj.listarPagos();
        }

        public List<PagosCLS> filtrarPagos(PagosCLS objPagos)
        {
            PagosBL obj = new PagosBL();
            return obj.filtrarPagos(objPagos);
        }

        public int eliminarPagos(int id)
        {
            PagosBL obj = new PagosBL();
            return obj.eliminarPagos(id);
        }
    }
}
