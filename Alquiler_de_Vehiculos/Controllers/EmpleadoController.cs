using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Alquiler_de_Vehiculos.Controllers
{
    [Authorize(Policy = "EmpleadoOnly")]
    public class EmpleadoController : Controller
    {
        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
