using System;
using System.Collections.Generic;
using System.IO;
using Monitor.Data.Helper;

namespace Monitor.Data.Model
{
    public class Map
    {
        public List<MapNode> mapNodes;
        public MapNode rootMapNode;

        public Map()
        {
            rootMapNode = new MapNode();
        }

        public Map(FileSystemInfo fileSystemInfo)
        {
            rootMapNode = new MapNode(fileSystemInfo);
        }

        public string GetLocalPictureParh(string fullNamePath)
        {
            int pos = fullNamePath.IndexOf("map", StringComparison.Ordinal);
            return fullNamePath.Substring(pos);
        }

        public static MapNode GetMapTree()
        {
            return new MapNode(new DirectoryInfo(Config.MapPath));
        }
    }
}
