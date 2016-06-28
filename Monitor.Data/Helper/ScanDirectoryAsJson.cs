using System;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.IO;

namespace Monitor.Data.Helper
{
//    public class ScanDirectoryAsJson
//    {
//        public string label { get; set; }
//        public string picturePath { get; set; }
//        //public string pictureName { get; set; }
//        //public bool isFolder { get; set; }
//        //public string key { get; set; }
//        public List<ScanDirectoryAsJson> children { get; set; }//child directory tree
//        public ScanDirectoryAsJson(FileSystemInfo fileSystemInfo)
//        {
//            label = fileSystemInfo.Name;
//            children = new List<ScanDirectoryAsJson>();

//            if (fileSystemInfo.Attributes == FileAttributes.Directory)
//            {
//                //isFolder = true;
//                foreach (FileSystemInfo f in (fileSystemInfo as DirectoryInfo).GetFileSystemInfos())
//                {
//                    children.Add(new ScanDirectoryAsJson(f));
//                }
//            }
//            else
//            {
//                //isFolder = false;
//                if (Array.IndexOf(new string[] { ".jpg", ".bmp", ".png" }, fileSystemInfo.Extension) != -1)
//                {
//                    picturePath = fileSystemInfo.FullName;
//                }
//            }
//            //key = label.Replace(" ", "").ToLower();
//        }

//        public new string ToString()
//        {
//            return JsonConvert.SerializeObject(this, Formatting.Indented);
//        }

//        public static string GetMapJsonString()
//        {
//            return new ScanDirectoryAsJson(new DirectoryInfo(Config.MapPath)).ToString();
//        }

//        public static ScanDirectoryAsJson GetMapTree()
//        {
//            return new ScanDirectoryAsJson(new DirectoryInfo(Config.MapPath));
//        }
//    }
//}

    public class ScanDirectoryAsJson
    {
        public string label { get; set; }
        public string picturePath { get; set; }
        //public string pictureName { get; set; }
        //public bool isFolder { get; set; }
        //public string key { get; set; }
        public string configPath { get; set; }
        public List<ScanDirectoryAsJson> children { get; set; }//child directory tree

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

        public string GetLocalPictureParh(string fullNamePath)
        {
            int pos = fullNamePath.IndexOf("map", StringComparison.Ordinal);
            return fullNamePath.Substring(pos);
        }

        public new string ToString()
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
