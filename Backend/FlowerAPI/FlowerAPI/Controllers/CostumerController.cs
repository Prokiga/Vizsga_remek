using FlowerAPI.Models;
using FlowerAPI.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CostumerController : ControllerBase
    {
        private readonly SzinesNegyEvszakContext _szinesNegyEvszakContext;

        public CostumerController(SzinesNegyEvszakContext szinesNegyEvszakContext)
        {
            _szinesNegyEvszakContext = szinesNegyEvszakContext;
        }

        [HttpPost]
        public async Task<ActionResult> CreateCostumer([FromBody] CreateCostumersDTO createCostumersDTO)
        {
            try
            {
                var costumer = new Costumer
                { 
                    CostumerName = createCostumersDTO.CostumerName,
                    CostumerTaxnumber = createCostumersDTO.CostumerTaxnumber,
                    CostumerPhonenumber = createCostumersDTO.CostumerPhonenumber,
                    CostumerPostalCode = createCostumersDTO.CostumerPostalCode,
                    CostumerCity = createCostumersDTO.CostumerCity,
                    CostumerAddress =createCostumersDTO.CostumerAddress
                };

                if (costumer != null)
                {
                    await _szinesNegyEvszakContext.AddAsync(costumer);
                    await _szinesNegyEvszakContext.SaveChangesAsync();
                    return Ok(new
                    {
                        Message = "Vásárló sikeresen hozzáadva.",
                        result = costumer
                    });
                }
                return BadRequest(new { message = "A vásárló nem lett hozzáadva!" });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetAllCostumers()
        {
            try
            {
                return Ok(new
                {
                    message = "Sikeres lekérdezés",
                    result = await _szinesNegyEvszakContext.Costumers.ToListAsync()
                });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }
    }
}
