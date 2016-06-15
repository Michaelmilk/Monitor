using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;

namespace Monitor.Data.Helper
{
    class ScanDirectoryAsJson
    {
        public string label { get; set; }
        public bool isFolder { get; set; }
        public string key { get; set; }
        public List<ScanDirectoryAsJson> children { get; set; }//child directory tree
        public ScanDirectoryAsJson(FileSystemInfo fsi)
        {
            label = fsi.Name;
            children = new List<ScanDirectoryAsJson>();

            if (fsi.Attributes == FileAttributes.Directory)
            {
                isFolder = true;
                foreach (FileSystemInfo f in (fsi as DirectoryInfo).GetFileSystemInfos())
                {
                    children.Add(new ScanDirectoryAsJson(f));
                }
            }
            else
            {
                isFolder = false;
            }
            key = label.Replace(" ", "").ToLower();
        }

        public string JsonToDynatree()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

    }
}
