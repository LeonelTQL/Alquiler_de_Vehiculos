using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace Alquiler_de_Vehiculos.Controllers
{
    public class EmpleadosController : Controller
    {
        public IActionResult Index()
        {
            EmpleadosBL obj = new EmpleadosBL();
            var Empleados = obj.listarEmpleados();
            return View(Empleados);
        }

        public List<EmpleadosCLS> listarEmpleados()
        {
            EmpleadosBL obj = new EmpleadosBL();

            return obj.listarEmpleados();
        }

        public List<EmpleadosCLS> filtrarEmpleados(EmpleadosCLS objEmpleado)
        {
            EmpleadosBL obj = new EmpleadosBL();
            return obj.filtrarEmpleados(objEmpleado);
        }

        public int guardarEmpleados(EmpleadosCLS obj)
        {
            EmpleadosBL oCliente = new EmpleadosBL();
            return oCliente.guardarEmpleados(obj);
        }


        public int eliminarEmpleados(int id)
        {
            EmpleadosBL obj = new EmpleadosBL();
            return obj.eliminarEmpleados(id);
        }

        public EmpleadosCLS recuperarEmpleados(int idEmpleado)
        {
            EmpleadosBL obj = new EmpleadosBL();
            return obj.recuperarEmpleados(idEmpleado);
        }
    }
}
