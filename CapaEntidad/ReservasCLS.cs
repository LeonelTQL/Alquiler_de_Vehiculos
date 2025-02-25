using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class ReservasCLS
    {
       public int idReservas {  get; set; }
        public string nombreCliente { get; set; }
        public string vehiculo { get; set; }
        public DateOnly fechaInicio { get; set; }
        public DateOnly fechaFin { get; set; }
        public string estado { get; set; }

    }
}
