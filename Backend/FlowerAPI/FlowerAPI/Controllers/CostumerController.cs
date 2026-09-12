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
        public async Task<ActionResult> CreateCostumer([FromBody] CostumersDTO createCostumersDTO)
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
                    CostumerAddress = createCostumersDTO.CostumerAddress
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
                    data = await _szinesNegyEvszakContext.Costumers.ToListAsync()
                });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }

        [HttpGet("List")]
        public async Task<ActionResult> GetCostumerList()
        {
            try
            {
                var costumers = await _szinesNegyEvszakContext.Costumers
                    .Select(c => new
                    {
                        c.CostumerId,
                        c.CostumerName,
                    })
                    .ToListAsync();
                return Ok(costumers);
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }

        /*
        [HttpPut]
        public async Task<ActionResult> UpdateCostumer([FromQuery] int id, [FromBody] CostumersDTO updateCostumersDTO)
        {
            try
            {
                var costumer = await _szinesNegyEvszakContext.Costumers.FirstOrDefaultAsync(c => c.CostumerId == id);
                if (costumer == null)
                {
                    return NotFound(new { Message = "A vásárló nem található!" });
                }
                costumer.CostumerTaxnumber = updateCostumersDTO.CostumerTaxnumber;
                costumer.CostumerPhonenumber = updateCostumersDTO.CostumerPhonenumber;
                costumer.CostumerPostalCode = updateCostumersDTO.CostumerPostalCode;
                costumer.CostumerCity = updateCostumersDTO.CostumerCity;
                costumer.CostumerAddress = updateCostumersDTO.CostumerAddress;
                _szinesNegyEvszakContext.Update(costumer);
                await _szinesNegyEvszakContext.SaveChangesAsync();
                return Ok(new
                {
                    Message = "Vásárló sikeresen frissítve.",
                    result = costumer
                });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCostumer([FromQuery] int id)
        {
            try
            {
                var costumer = await _szinesNegyEvszakContext.Costumers.FirstOrDefaultAsync(c => c.CostumerId == id);
                if (costumer == null)
                {
                    return NotFound(new { Message = "A vásárló nem található!" });
                }
                _szinesNegyEvszakContext.Costumers.Remove(costumer);
                await _szinesNegyEvszakContext.SaveChangesAsync();
                return Ok(new
                {
                    Message = "Vásárló sikeresen törölve.",
                    result = costumer
                });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }*/
    }
}
