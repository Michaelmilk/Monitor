using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monitor.Data.Model
{
    public class MapNodeInfo
    {
        public int id { get; set; }
        public string label { get; set; }
        public string picturePath { get; set; }
        public string configPath { get; set; }
        public int iconCount { get; set; }
        public List<LocationIcon> locationIconList { get; set; }
    }
}
