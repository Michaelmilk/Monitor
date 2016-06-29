using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Monitor.Data.Model;

namespace Monitor.Data.Helper
{
    public class XmlHelper
    {
        public static void SerializeToFile(MapConfig obj)
        {
            System.Xml.Serialization.XmlSerializer writer =
                new System.Xml.Serialization.XmlSerializer(typeof(MapConfig));

            System.IO.FileStream file = System.IO.File.Create(@"D:\E\github\Monitor\xml\test.xml");

            writer.Serialize(file, obj);
            file.Close();
        }

        public static void DeserializeToFile()
        {
            System.Xml.Serialization.XmlSerializer reader =
                new System.Xml.Serialization.XmlSerializer(typeof(MapConfig));
            System.IO.StreamReader file = new System.IO.StreamReader(@"D:\E\github\Monitor\xml\test.xml");
            MapConfig overview = (MapConfig)reader.Deserialize(file);
            file.Close();

            Console.WriteLine(overview.ToString());
        }

        public static void AddNode()
        {
            
        }
    }
}
