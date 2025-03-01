using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class PagosCLS
    {
        public int idPago { get; set; }
        public int reservaId { get; set; }
        public string nombreCliente { get; set; }
        public string vehiculo { get; set; }
        public decimal monto { get; set; }
        public string metodoPago { get; set; }
        public DateTime fechaPago { get; set; }
        public string terminoBusqueda {  get; set; }
    }
}
