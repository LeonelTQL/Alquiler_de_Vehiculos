using CapaDatos;
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
            var clientes = obj.listarClientes();
            return View(clientes);
        }

        public List<ClienteCLS> listarClientes()
        {
            ClienteBL obj = new ClienteBL();

            return obj.listarClientes();
        }

        public List<ClienteCLS> filtrarClientes(ClienteCLS objCliente)
        {
            ClienteBL obj = new ClienteBL();
            return obj.filtrarClientes(objCliente);
        }

        public int guardarClientes(ClienteCLS obj)
        {
            ClienteBL oCliente = new ClienteBL();
            return oCliente.guardarClientes(obj);
        }


        public int eliminarClientes(int id)
        {
            ClienteBL obj = new ClienteBL();
            return obj.eliminarClientes(id);
        }

        public ClienteCLS recuperarClientes(int idCliente)
        {
            ClienteBL obj = new ClienteBL();
            return obj.recuperarClientes(idCliente);
        }
    }
}
