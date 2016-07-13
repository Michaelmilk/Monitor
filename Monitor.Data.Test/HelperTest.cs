using System;
using System.Collections.Generic;
using System.IO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monitor.Data.Helper;
using Monitor.Data.Model;
using Monitor.Data.Interface;
using EnvDTE;
using EnvDTE100;

namespace Monitor.Data.Test
{
    [TestClass]
    public class HelperTest
    {
        [TestMethod]
        public void ScanDirectoryAsJsonTest()
        {
            ScanDirectoryAsJson di = new ScanDirectoryAsJson(new DirectoryInfo(Config.MapPath));
            //string result = "[" + di.JsonToDynatree() + "]";
            string result = di.ToString();
            Console.WriteLine(System.Diagnostics.Process.GetCurrentProcess().MainModule.FileName);
            
            Console.WriteLine(DateTime.Now);
            Console.WriteLine(result);
            //Trace.Write(result);GetMapJsonString
            Console.WriteLine("------------------------------");
            Console.WriteLine(DateTime.Now);
            Console.WriteLine(ScanDirectoryAsJson.GetMapJsonString());
            Console.WriteLine("------------------------------");
            Console.WriteLine(DateTime.Now);
            Console.WriteLine(ScanDirectoryAsJson.GetMapTree().ToString());
        }

        [TestMethod]
        public void DirectoryTest()
        {
            //current solution test
            Console.WriteLine(System.Environment.CurrentDirectory);
            Console.WriteLine(System.IO.Directory.GetCurrentDirectory());
            Console.WriteLine(System.AppDomain.CurrentDomain.BaseDirectory);
            String rootPath = AppDomain.CurrentDomain.SetupInformation.ApplicationBase;
            Console.WriteLine(rootPath);
            var rptPath = Path.GetFullPath(@"..\..\");
            Console.WriteLine(rptPath);

            string solutionDirectory = ((EnvDTE.DTE)System.Runtime
                                              .InteropServices
                                              .Marshal
                                              .GetActiveObject("VisualStudio.DTE.12.0"))
                                   .Solution
                                   .FullName;
            solutionDirectory = System.IO.Path.GetDirectoryName(solutionDirectory);
            Console.WriteLine(solutionDirectory);
        }


        [TestMethod]
        public void XMLTest()
        {
            ILocationIcon icon1 = new ILocationIcon();
            ILocationIcon icon2 = new ILocationIcon();
            Map mapConfig = new Map();
            mapConfig.AddIcon(icon1);
            mapConfig.AddIcon(icon2);
            XmlHelper.SerializeToFile(mapConfig);
            XmlHelper.DeserializeToFile();
        }
    }
}
