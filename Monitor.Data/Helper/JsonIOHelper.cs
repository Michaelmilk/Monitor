using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monitor.Data.Model;
using Newtonsoft.Json;

namespace Monitor.Data.Helper
{
    public class JsonIOHelper
    {
        public static List<LocationIcon> ReadFromJsonFile(string path)
        {
            using (StreamReader r = new StreamReader(path))
            {
                string jsonReadFromFile = r.ReadToEnd();
                List<LocationIcon> icons = JsonConvert.DeserializeObject<List<LocationIcon>>(jsonReadFromFile);
                return icons;
            }
        }

        public static void WriteToJsonFile(List<LocationIcon> json, string path)
        {
            using (StreamWriter w = new StreamWriter(path))
            {
                string jsonWriteToFile = JsonConvert.SerializeObject(json);
                w.Write(jsonWriteToFile);
            }
        }
    }
}
