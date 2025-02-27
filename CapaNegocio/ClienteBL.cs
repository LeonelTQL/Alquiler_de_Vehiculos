using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CapaDatos;
using CapaEntidad;

namespace CapaNegocio
{
    public class ClienteBL
    {
        public List<ClienteCLS> listarClientes()
        {
            ClienteDAL obj = new ClienteDAL();

            return obj.listarClientes();
        }

        public List<ClienteCLS> filtrarClientes(ClienteCLS objCliente)
        {
            ClienteDAL obj = new ClienteDAL();
            return obj.filtrarClientes(objCliente);
        }

        public int guardarClientes(ClienteCLS obj)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.guardarClientes(obj);
        }

        public int eliminarClientes(int id)
        {
            ClienteDAL obj = new ClienteDAL();
            return obj.eliminarClientes(id);
        }

        public ClienteCLS recuperarClientes(int obj)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.recuperarClientes(obj);
        }
    }

}
    
    
