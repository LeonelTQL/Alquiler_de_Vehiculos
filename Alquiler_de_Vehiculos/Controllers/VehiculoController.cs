using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace Alquiler_de_Vehiculos.Controllers
{
    public class VehiculoController : Controller
    {
        public IActionResult Index()
        {
            VehiculoBL obj = new VehiculoBL();
            var Vehiculos = obj.listarVehiculos();
            return View(Vehiculos);
        }

        public List<VehiculoCLS> listarVehiculos()
        {
            VehiculoBL obj = new VehiculoBL();

            return obj.listarVehiculos();
        }

        public List<VehiculoCLS> filtrarVehiculos(VehiculoCLS objVehiculo)
        {
            VehiculoBL obj = new VehiculoBL();
            return obj.filtrarVehiculos(objVehiculo);
        }

        public int guardarVehiculos(VehiculoCLS obj)
        {
            VehiculoBL oVehiculo = new VehiculoBL();
            return oVehiculo.guardarVehiculos(obj);
        }
        public int eliminarVehiculos(int id)
        {
            VehiculoBL obj = new VehiculoBL();
            return obj.eliminarVehiculos(id);
        }
        public VehiculoCLS recuperarVehiculos(int idVehiculo)
        {
            VehiculoBL obj = new VehiculoBL();
            return obj.recuperarVehiculos(idVehiculo);
        }
    }
}
