using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;
using Monitor.Data.Interface;

namespace Monitor.Data.Helper
{
    public class ScanDirectoryAsJson
    {
        public string label { get; set; }
        public string picturePath { get; set; }
        //public string pictureName { get; set; }
        //public bool isFolder { get; set; }
        //public string key { get; set; }
        public string configPath { get; set; }
        public List<ScanDirectoryAsJson> children { get; set; }//child directory tree
        public List<ILocationIcon> LocationIconList { get; set; }//location info list

        //public ScanDirectoryAsJson2(ScanDirectoryAsJson2 parent, FileSystemInfo fileSystemInfo)
        public ScanDirectoryAsJson(FileSystemInfo fileSystemInfo)
        {
            label = fileSystemInfo.Name;
            children = new List<ScanDirectoryAsJson>();

            if (fileSystemInfo.Attributes == FileAttributes.Directory)
            {
                //isFolder = true;
                foreach (FileSystemInfo f in (fileSystemInfo as DirectoryInfo).GetFileSystemInfos())
                {
                    if (f.Attributes == FileAttributes.Directory)
                    {
                        children.Add(new ScanDirectoryAsJson(f));
                    }
                    else
                    {
                        //isFolder = false;
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
                                picturePath = f.FullName;
                            }

                            if (f.Extension == ".prj")
                            {
                                configPath = f.FullName;
                            }
                        }
                        
                    }
                }
            }
        }

        //get local picture path, the map folder is in root of Monitor directory(Monitor/map/...),
        //so just get the path start from map/...
        public string GetLocalPictureParh(string fullNamePath)
        {
            int pos = fullNamePath.IndexOf("map", StringComparison.Ordinal);
            return fullNamePath.Substring(pos);
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        public static string GetMapJsonString()
        {
            return new ScanDirectoryAsJson(new DirectoryInfo(Config.MapPath)).ToString();
        }

        public static ScanDirectoryAsJson GetMapTree()
        {
            return new ScanDirectoryAsJson(new DirectoryInfo(Config.MapPath));
        }
    }
}
