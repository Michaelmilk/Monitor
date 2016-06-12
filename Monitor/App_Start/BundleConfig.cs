using System.Web;
using System.Web.Optimization;

namespace Monitor
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/lib/jquery-{version}.js",
                        "~/Scripts/lib/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/lib/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/lib/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/lib/bootstrap.js",
                      "~/Scripts/lib/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/lib/angular.js",
                      "~/Scripts/lib/angular-animate.js",
                      "~/Scripts/lib/abn_tree_directive.js",
                      "~/Scripts/lib/contextMenu.js",
                      "~/Scripts/directive/right-click.js",
                      "~/dist/menu_component.js"
                      //"~/dist/right_menu.js"
                      
                      //"~/dist/tree_component.js"
                     ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/font-awesome/css/font-awesome.css",
                      "~/Content/abn_tree.css",
                      "~/Content/cyclemenu.css",
                      "~/Content/jquery-ui.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      // services
                      

                      // directives
                  
                      // controllers
                      "~/Scripts/controller/homeCtrl.js",

                      // app
                      "~/Scripts/app.js"
                      ));
         }
    }
}
