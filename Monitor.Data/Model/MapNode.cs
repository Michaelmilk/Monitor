using System;
using System.Collections.Generic;
using System.IO;
using Monitor.Data.Helper;
using Newtonsoft.Json;

namespace Monitor.Data.Model
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
        public List<LocationIcon> locationIconList { get; set; }

        //map mapId to mapInfo
        public static Dictionary<int, MapNodeInfo> mapNodes = new Dictionary<int, MapNodeInfo>();
        public static int idCount = 0;
        public MapNode()
        {
            id = -1;
            label = "";
            picturePath = "";
            configPath = "";
            iconCount = 0;
            children = new List<MapNode>();
            locationIconList = new List<LocationIcon>();
        }

        public MapNode(FileSystemInfo fileSystemInfo)
        {
            //MapNodeInfo is used for convenience to generate dictionary
            MapNodeInfo mapNodeInfo = new MapNodeInfo();
            mapNodeInfo.id = id = idCount++;
            mapNodeInfo.label = label = fileSystemInfo.Name;
            children = new List<MapNode>();
            mapNodes.Add(id, mapNodeInfo);

            if (fileSystemInfo.Attributes == FileAttributes.Directory)
            {
                foreach (FileSystemInfo f in (fileSystemInfo as DirectoryInfo).GetFileSystemInfos())
                {
                    if (f.Attributes == FileAttributes.Directory)
                    {
                        children.Add(new MapNode(f));
                    }
                    else
                    {
                        //Todo: picturePath = Config.LocalDevelop ? GetLocalPictureParh(f.FullName) : f.FullName;
                        //if local develop, then use local picture path
                        if (Config.LocalDevelop)
                        {
                            if (Array.IndexOf(new string[] { ".jpg", ".bmp", ".png" }, f.Extension) != -1)
                            {
                                picturePath = GetLocalPictureParh(f.FullName);
                            }

                            if (f.Extension == ".prj")
                            {
                                configPath = GetLocalPictureParh(f.FullName);
                            }
                        }
                        else
                        {
                            if (Array.IndexOf(new string[] { ".jpg", ".bmp", ".png" }, f.Extension) != -1)
                            {
                                mapNodeInfo.picturePath = picturePath = f.FullName;
                            }

                            if (f.Extension == ".prj")
                            {
                                mapNodeInfo.configPath = configPath = f.FullName;
                            }
                        }
                    }
                }
            }
        }

        public string GetLocalPictureParh(string fullNamePath)
        {
            int pos = fullNamePath.IndexOf("map", StringComparison.Ordinal);
            return fullNamePath.Substring(pos);
        }

        public void AddIcon(LocationIcon icon)
        {
            locationIconList.Add(icon);
        }

        public void DeleteIcon(LocationIcon icon)
        {
            locationIconList.Remove(icon);
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        public static MapNode GetMapTree()
        {
            return new MapNode(new DirectoryInfo(Config.MapPath));
            //return new MapNode(new DirectoryInfo(@"D:\E\github\Monitor\Monitor\map"));
        }

        public void OutPutAllNodes()
        {
            foreach (var node in mapNodes)
            {
                Console.WriteLine(JsonConvert.SerializeObject(node, Formatting.Indented));
            }
        }
    }
}
