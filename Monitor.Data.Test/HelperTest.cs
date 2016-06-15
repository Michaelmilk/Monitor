using System;
using System.IO;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Monitor.Data.Helper;

namespace Monitor.Data.Test
{
    [TestClass]
    public class HelperTest
    {
        [TestMethod]
        public void ScanDirectoryAsJsonTest()
        {
            ScanDirectoryAsJson di = new ScanDirectoryAsJson(new DirectoryInfo(@"D:\work"));
            //string result = "[" + di.JsonToDynatree() + "]";
            string result = di.ToString();

            Console.WriteLine(DateTime.Now);
            Console.WriteLine(result);
            //Trace.Write(result);GetMapJsonString
            Console.WriteLine("------------------------------");
            Console.WriteLine(DateTime.Now);
            Console.WriteLine(ScanDirectoryAsJson.GetMapJsonString());
        }
    }
}
