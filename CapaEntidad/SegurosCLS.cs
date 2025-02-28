using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaEntidad
{
    public class SegurosCLS
    {
        public int idSeguro { get; set; }
        public int reservaId { get; set; }
        public string nombreCliente { get; set; }
        public string vehiculo { get; set; }
        public string tipoSeguro { get; set; }
        public decimal costo { get; set; }
        public string terminoBusqueda { get; set; }
    }
}
