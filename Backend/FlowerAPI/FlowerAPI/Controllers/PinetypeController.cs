using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlowerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PinetypeController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<string>> GetPinetypes()
        {
            var pinetypes = new List<string>
            {
                "Scots Pine",
                "Eastern White Pine",
                "Loblolly Pine",
                "Longleaf Pine",
                "Slash Pine"
            };
            return Ok(pinetypes);
        }
    }
}
