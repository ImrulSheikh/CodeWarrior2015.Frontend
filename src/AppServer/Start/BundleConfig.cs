using System.Web.Optimization;

namespace CW.Frontend.AppServer.Start {
    public class BundleConfig {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles) {
            RegisterScripts(bundles);
            RegisterStyles(bundles);
        }

        private static void RegisterScripts(BundleCollection bundles) {
            bundles.Add(new ScriptBundle("~/Assets/Scripts").IncludeDirectory("~/Assets/Scripts", "*.js", true));
            bundles.Add(new ScriptBundle("~/Assets/Scripts/eShopper").IncludeDirectory("~/Assets/Scripts/eShopper", "*.js", true));
        }

        private static void RegisterStyles(BundleCollection bundles) {
            bundles.Add(new StyleBundle("~/Assets/Styles").IncludeDirectory("~/Assets/Styles", "*.css", true));

        }
    }
}