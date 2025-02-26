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

            return obj.listarCliente();
        }

        public List<ClienteCLS> FiltrarClientes(ClienteCLS objCliente)
        {
            ClienteDAL obj = new ClienteDAL();
            return obj.FiltrarCliente(objCliente);
        }
        public int guardarCliente(ClienteCLS obj)
        {
            ClienteDAL oClienteDAL = new ClienteDAL();
            return oClienteDAL.GuargarCliente(obj);
        }

    }

}
    
    
