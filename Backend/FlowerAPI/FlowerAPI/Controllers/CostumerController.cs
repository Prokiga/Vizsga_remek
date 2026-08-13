using FlowerAPI.Models;
using FlowerAPI.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CostumerController : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult> CreateCostumer([FromBody] CreateCostumersDTO createCostumersDTO)
        {
            return Ok(new { Message = "Costumer created successfully", CostumerName = createCostumersDTO.CostumerName });
        }
    }
}
