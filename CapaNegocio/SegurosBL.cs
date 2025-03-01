using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class SegurosBL
    {
        public List<SegurosCLS> listarSeguros()
        {
            SegurosDAL obj = new SegurosDAL();

            return obj.listarSeguros();
        }

        public List<SegurosCLS> filtrarSeguros(SegurosCLS objSeguros)
        {
            SegurosDAL obj = new SegurosDAL();
            return obj.filtrarSeguros(objSeguros);
        }
        public int guardarSeguros(SegurosCLS obj)
        {
            SegurosDAL oSegurosDAL = new SegurosDAL();
            return oSegurosDAL.guardarSeguros(obj);
        }


        public int eliminarSeguros(int id)
        {
            SegurosDAL obj = new SegurosDAL();
            return obj.eliminarSeguros(id);
        }
        public SegurosCLS recuperarSeguros(int obj)
        {
            SegurosDAL oSegurosDAL = new SegurosDAL();
            return oSegurosDAL.recuperarSeguros(obj);
        }
    }
}
