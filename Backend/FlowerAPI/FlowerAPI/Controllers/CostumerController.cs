using FlowerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CostumerController : ControllerBase
    {
        [HttpPost]
        public ActionResult CreateCostumer([FromBody] Costumer costumer)
        {
            // Here you would typically save the costumer to a database
            // For demonstration purposes, we'll just return the costumer object
            return Ok(costumer);
        }
    }
}
