using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monitor.Data.Interface;

namespace Monitor.Data.Model
{
    public class MapConfig
    {
        public List<LocationIcon> iconList { get; set; }

        public MapConfig()
        {
            iconList = new List<LocationIcon>();
        }

        public void AddIcon(LocationIcon icon)
        {
            iconList.Add(icon);
        }

        public void DeleteIcon(LocationIcon icon)
        {
            iconList.Remove(icon);
        }

        public new string ToString()
        {
            var nodes = "";
            foreach (var icon in iconList)
            {
                nodes += string.Format("Pointer:{0}, {1}, url:{2} \n", icon.location.X, icon.location.Y, icon.iconUrl);
            }
            return nodes;
        }
    }
}
