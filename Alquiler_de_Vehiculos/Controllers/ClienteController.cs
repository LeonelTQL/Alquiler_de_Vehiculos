using CapaEntidad;
using CapaNegocio;
using Microsoft.AspNetCore.Mvc;

namespace Alquiler_de_Vehiculos.Controllers
{
    public class ClienteController : Controller
    {
        public IActionResult Index()
        {
            ClienteBL obj = new ClienteBL();
            var reservas = obj.listarClientes();
            return View(reservas);
        }

        public List<ClienteCLS> listarClientes()
        {
            ClienteBL obj = new ClienteBL();

            return obj.listarClientes();
        }

        public List<ClienteCLS> filtrarClientes(ClienteCLS objReservas)
        {
            ClienteBL obj = new ClienteBL();
            return obj.FiltrarClientes(objReservas);
        }

        public int guardarReservas(ClienteCLS obj)
        {
            ClienteBL oReservas = new ClienteBL();
            return oReservas.guardarCliente(obj);
        }
    }
}
