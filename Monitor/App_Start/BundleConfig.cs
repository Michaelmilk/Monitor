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
                        "~/Scripts/libs/jquery-{version}.js",
                        //"~/Scripts/libs/jquery.js",
                        "~/Scripts/libs/jquery-ui.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/libs/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/libs/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/libs/bootstrap.js",
                      "~/Scripts/libs/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                      "~/Scripts/libs/angular.js",
                      "~/Scripts/libs/angular-resource.js",
                      "~/Scripts/libs/angular-animate.js",
                      "~/Scripts/libs/abn_tree_directive.js",
                      "~/Scripts/libs/contextMenu.js",
                      "~/Scripts/libs/loading-bar.js",
                      "~/Scripts/libs/spin.js",
                      "~/Scripts/libs/angular-spinner.js",
                      "~/Scripts/directives/right-click.js",
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
                      "~/Content/loading-bar.css",
                      "~/Content/main.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/app").Include(
                      //interfaces
                      "~/Scripts/interfaces/IMapNode.js",
                      "~/Scripts/interfaces/IMapNodeResource.js",

                      //services
                      "~/Scripts/services/NetResourceService.js",

                      // directives
                  
                      // controllers
                      "~/Scripts/controllers/homeCtrl.js",

                      // app
                      "~/Scripts/app.js"
                      ));
         }
    }
}
