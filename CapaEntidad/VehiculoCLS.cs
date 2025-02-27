using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class VehiculoCLS
    {
        public int idVehiculo { get; set; }
        public string marca { get; set; }
        public string modelo { get; set; }
        public int anio { get; set; }
        public decimal precio { get; set; }
        public string estado { get; set; }
        public string terminoBusqueda { get; set; }
    }
}
