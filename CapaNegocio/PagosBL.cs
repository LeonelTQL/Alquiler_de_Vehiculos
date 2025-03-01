using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class PagosBL
    {
        public List<PagosCLS> listarPagos()
        {
            PagosDAL obj = new PagosDAL();

            return obj.listarPagos();
        }

        public List<PagosCLS> filtrarPagos(PagosCLS objPagos)
        {
            PagosDAL obj = new PagosDAL();
            return obj.filtrarPagos(objPagos);
        }
        public int guardarPagos(PagosCLS obj)
        {
            PagosDAL oSegurosDAL = new PagosDAL();
            return oSegurosDAL.guardarPagos(obj);
        }
        public int eliminarPagos(int id)
        {
            PagosDAL obj = new PagosDAL();
            return obj.eliminarPagos(id);
        }
        public PagosCLS recuperarPagos(int obj)
        {
            PagosDAL oPagosDAL = new PagosDAL();
            return oPagosDAL.recuperarPagos(obj);
        }
    }
}
