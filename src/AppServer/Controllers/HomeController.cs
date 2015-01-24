using System.Web.Mvc;

namespace CW.Frontend.AppServer.Controllers {
    public class HomeController : Controller {
        public ActionResult Index() {
            return View();
        }
    }
}