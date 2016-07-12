using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monitor.Data.Interface
{
    public class IMapNode
    {
        public int iconCount { get; set; }
        public List<ILocationIcon> iconList { get; set; }

        public IMapNode()
        {
            iconCount = 0;
            iconList = new List<ILocationIcon>();
        }

        public void AddIcon(ILocationIcon icon)
        {
            iconList.Add(icon);
        }

        public void DeleteIcon(ILocationIcon icon)
        {
            iconList.Remove(icon);
        }

        public override string ToString()
        {
            var nodes = "";
            foreach (var icon in iconList)
            {
                nodes += string.Format("Pointer:{0}, {1}, url:{2} \n", icon.locationCoordinate.X, icon.locationCoordinate.Y, icon.iconUrl);
            }
            return nodes;
        }
    }
}
