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
        public List<ClienteCLS> listarCliente()
        {
            ClienteDAL obj = new ClienteDAL();

            return obj.listarCliente();
        }

    }

}
    
    
