using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Drawing;

namespace Monitor.Data.Interface
{
    public class LocationIcon
    {
        public Point location { get; set; }
        public string iconUrl { get; set; }

        public LocationIcon()
        {
            location = new Point(0, 0);
            iconUrl = "http://";
        }
    }
}
