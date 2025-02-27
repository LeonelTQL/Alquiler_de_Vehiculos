using CapaDatos;
using CapaEntidad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class VehiculoBL
    {

        public List<VehiculoCLS> listarVehiculos()
        {
            VehiculoDAL obj = new VehiculoDAL();

            return obj.listarVehiculos();
        }

        public List<VehiculoCLS> filtrarVehiculos(VehiculoCLS objVehiculo)
        {
            VehiculoDAL obj = new VehiculoDAL();
            return obj.filtrarVehiculos(objVehiculo);
        }

        public int guardarVehiculos(VehiculoCLS obj)
        {
            VehiculoDAL oVehiculoDAL = new VehiculoDAL();
            return oVehiculoDAL.guardarVehiculos(obj);
        }

        public int eliminarVehiculos(int id)
        {
            VehiculoDAL obj = new VehiculoDAL();
            return obj.eliminarVehiculos(id);
        }
    }
}
