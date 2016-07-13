using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SqlServer.Server;

namespace Monitor.Data.Interface
{
    public class MapNode
    {
        public int id { get; set; }
        public string label { get; set; }
        public string picturePath { get; set; }
        //public string pictureName { get; set; }
        //public bool isFolder { get; set; }
        //public string key { get; set; }
        public string configPath { get; set; }
        public List<MapNode> children { get; set; }//child directory tree
        public int iconCount { get; set; }
        public List<ILocationIcon> locationIconList { get; set; }

        public MapNode()
        {
            id = 0;
            label = "";
            picturePath = "";
            configPath = "";
            iconCount = 0;
            children = new List<MapNode>();
            locationIconList = new List<ILocationIcon>();
        }

        //public void AddIcon(ILocationIcon icon)
        //{
        //    iconList.Add(icon);
        //}

        //public void DeleteIcon(ILocationIcon icon)
        //{
        //    iconList.Remove(icon);
        //}

        public override string ToString()
        {
            var nodes = "";
            nodes += string.Format("id: {0}\n, label: {1}\n, picturePath:{2}\n, configPath:{3}\n, iconCount:{4}\n",
                id, label, picturePath, configPath, iconCount);
            foreach (var icon in locationIconList)
            {
                nodes += string.Format("Pointer:{0}, {1}\n url:{2} \n", icon.locationCoordinate.X, icon.locationCoordinate.Y, icon.iconUrl);
            }
            return nodes;
        }
    }
}
