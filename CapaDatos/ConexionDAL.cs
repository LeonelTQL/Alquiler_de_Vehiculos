using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class ConexionDAL
    {
        public string cadenaDato { get; set; }

        public ConexionDAL()
        {
            IConfigurationBuilder builder = new ConfigurationBuilder();
            builder.AddJsonFile("appsettings.json");
            var root = builder.Build();
            cadenaDato = root.GetConnectionString("cn");
        }
    }
}
