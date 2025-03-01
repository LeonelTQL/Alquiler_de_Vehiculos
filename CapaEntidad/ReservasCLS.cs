using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ReservasCLS
    {
        public int idReservas { get; set; }
        public int idCliente { get; set; }
        public string nombreCliente { get; set; }
        public int idVehiculo { get; set; }
        public string vehiculo { get; set; }
        public DateTime fechaInicio { get; set; }
        public DateTime fechaFin { get; set; }
        public string estado { get; set; }
        public string terminoBusqueda { get; set; }

    }
}
