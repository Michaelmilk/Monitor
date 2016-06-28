using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EnvDTE;
using EnvDTE100;
using System.Web;

namespace Monitor.Data
{
    public class Config
    {
        public static bool LocalDevelop = true;
        //public static string MapDirectory = GetCurrentSolutionDirectory() + "map";//
        static string GetCurrentSolutionLocalPath()
        {
            //this solution direction depend on VS's version
            //string solutionDirectory = ((EnvDTE.DTE)System.Runtime
            //                                  .InteropServices
            //                                  .Marshal
            //                                  .GetActiveObject("VisualStudio.DTE.12.0"))
            //                                  .Solution
            //                                  .FullName;
            //solutionDirectory = System.IO.Path.GetDirectoryName(solutionDirectory);

            //var debugPath = AppDomain.CurrentDomain.SetupInformation.ApplicationBase;//debug path
            //var solutionPath = Path.GetFullPath(@"..\..\..\");//map folder on Monitor/map
            var solutionPath = Path.GetFullPath(@"..\..\");//map folder on Monitor/Monitor/map
            //var mapPath = Path.Combine(solutionPath, "map");
            return solutionPath;
        }

        static string GetCurrentSolutionWebServerPath(HttpContext httpContext)
        {
            string appPath = httpContext.Request.ApplicationPath.ToLower();
                        
            if (appPath == "/")      //a site
                appPath = "/";
            else if (!appPath.EndsWith(@"/")) //a virtual
                appPath += @"/";

            string projectPath = System.Web.HttpContext.Current.Server.MapPath(appPath);
            if (!projectPath.EndsWith(@"\"))
                projectPath += @"\";

            projectPath = projectPath.TrimEnd('\\');
            //map folder locate at Monitor/Monitor
            var solutionPath = projectPath;

            //map folder locate at Monitor
            //var solutionPath = Directory.GetParent(projectPath).FullName;

            //var mapPath = Path.Combine(solutionPath, "map");
            return solutionPath;
        }


        public static string MapPath
        {
            get
            {
                var httpRequest = System.Web.HttpContext.Current;
                if (httpRequest == null)//it's local run
                {
                    return Path.Combine(GetCurrentSolutionLocalPath(), "map"); ;
                }
                else
                {
                    return Path.Combine(GetCurrentSolutionWebServerPath(httpRequest), "map");
                }
            }
        }

        public static string XmlPath
        {
            get
            {
                var httpRequest = System.Web.HttpContext.Current;
                if (httpRequest == null)//it's local run
                {
                    return Path.Combine(GetCurrentSolutionLocalPath(), "xml", "test.xml");
                }
                else
                {
                    return Path.Combine(GetCurrentSolutionWebServerPath(httpRequest), "xml", "test.xml");
                }
            }
        }
    }
}
