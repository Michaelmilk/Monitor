using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;

namespace Monitor.Data.Helper
{
    public class ScanDirectoryAsJson
    {
        public string label { get; set; }
        //public bool isFolder { get; set; }
        //public string key { get; set; }
        public List<ScanDirectoryAsJson> children { get; set; }//child directory tree
        public ScanDirectoryAsJson(FileSystemInfo fileSystemInfo)
        {
            label = fileSystemInfo.Name;
            children = new List<ScanDirectoryAsJson>();

            if (fileSystemInfo.Attributes == FileAttributes.Directory)
            {
                //isFolder = true;
                foreach (FileSystemInfo f in (fileSystemInfo as DirectoryInfo).GetFileSystemInfos())
                {
                    children.Add(new ScanDirectoryAsJson(f));
                }
            }
            else
            {
                //isFolder = false;
            }
            //key = label.Replace(" ", "").ToLower();
        }

        public new string ToString()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        public static string GetMapJsonString()
        {
            return new ScanDirectoryAsJson(new DirectoryInfo(Config.MapDirectory)).ToString();
        }

        public static ScanDirectoryAsJson GetMapTree()
        {
            return new ScanDirectoryAsJson(new DirectoryInfo(Config.MapDirectory));
        }
    }
}
