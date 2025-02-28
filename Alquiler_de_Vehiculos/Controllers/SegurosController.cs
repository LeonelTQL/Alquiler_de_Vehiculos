using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace Alquiler_de_Vehiculos.Controllers
{
    public class SegurosController : Controller
    {
        public IActionResult Index()
        {
            SegurosBL obj = new SegurosBL();
            var Seguros = obj.listarSeguros();
            return View(Seguros);
        }
        public List<SegurosCLS> listarSeguros()
        {
            SegurosBL obj = new SegurosBL();

            return obj.listarSeguros();
        }

        public List<SegurosCLS> filtrarSeguros(SegurosCLS objSeguros)
        {
            SegurosBL obj = new SegurosBL();
            return obj.filtrarSeguros(objSeguros);
        }

        public int eliminarSeguros(int id)
        {
            SegurosBL obj = new SegurosBL();
            return obj.eliminarSeguros(id);
        }
    }
}
