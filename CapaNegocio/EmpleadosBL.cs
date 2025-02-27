using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class EmpleadosBL
    {
        public List<EmpleadosCLS> listarEmpleados()
        {
            EmpleadosDAL obj = new EmpleadosDAL();

            return obj.listarEmpleados();
        }

        public List<EmpleadosCLS> filtrarEmpleados(EmpleadosCLS objEmpleado)
        {
            EmpleadosDAL obj = new EmpleadosDAL();
            return obj.filtrarEmpleados(objEmpleado);
        }

        public int guardarEmpleados(EmpleadosCLS obj)
        {
            EmpleadosDAL oEmpleadosDAL = new EmpleadosDAL();
            return oEmpleadosDAL.guardarEmpleados(obj);
        }

        public int eliminarEmpleados(int id)
        {
            EmpleadosDAL obj = new EmpleadosDAL();
            return obj.eliminarEmpleados(id);
        }


    }
}
