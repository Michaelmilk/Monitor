using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace Monitor.Data.Interface
{
    public class ILocationIcon
    {
        public int id { get; set; }
        public string name { get; set; }
        public Point locationCoordinate { get; set; }
        public string iconUrl { get; set; }

        public ILocationIcon()
        {
            locationCoordinate = new Point(0, 0);
            iconUrl = "icon/green.png";
        }
    }
}
