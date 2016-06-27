using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monitor.Data.Helper
{
    class XmlHelper
    {
        public static void SerializeToXmlFile(ScanDirectoryAsJson overview)
        {
            System.Xml.Serialization.XmlSerializer writer =
                new System.Xml.Serialization.XmlSerializer(typeof(ScanDirectoryAsJson));

            System.IO.FileStream file = System.IO.File.Create(Config.XmlPath);

            writer.Serialize(file, overview);
            file.Close();
        }

        public static void DeserializeToXmlFile()
        {
            System.Xml.Serialization.XmlSerializer reader =
                new System.Xml.Serialization.XmlSerializer(typeof(ScanDirectoryAsJson));
            System.IO.StreamReader file = new System.IO.StreamReader(Config.XmlPath);
            ScanDirectoryAsJson overview = (ScanDirectoryAsJson)reader.Deserialize(file);
            file.Close();

            Console.WriteLine(overview.ToString());

        }
    }
}
