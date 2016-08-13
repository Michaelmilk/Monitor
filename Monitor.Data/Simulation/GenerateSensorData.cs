using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monitor.Data.Model;

namespace Monitor.Data.Simulation
{
    public class GenerateSensorData
    {
        private static readonly Random ra = new Random();
        public static SensorData Generate()
        {
            return new SensorData(ra.NextDouble() * 100);;
        }
    }
}
