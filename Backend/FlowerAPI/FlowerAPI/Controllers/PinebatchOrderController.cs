using FlowerAPI.Models;
using FlowerAPI.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PinebatchOrderController : ControllerBase
    {
        private readonly SzinesNegyEvszakContext _szines_negy_evszak_context;

        public PinebatchOrderController(SzinesNegyEvszakContext szines_negy_evszak_context)
        {
            _szines_negy_evszak_context = szines_negy_evszak_context;
        }


        [HttpPost]
        public async Task<ActionResult> CreatePinebatchOrder([FromBody] PinebatchOrderDTO pinebatchOrderDTO)
        {
            try
            {
                var pinebatchOrder = new PinebatchOrder
                {
                    PineTypeId = pinebatchOrderDTO.PineTypeId,
                    PinebatchStateId = pinebatchOrderDTO.PinebatchStateId,
                    BatchQuantity = pinebatchOrderDTO.PineBatchQuantity,
                };
                if (pinebatchOrderDTO != null)
                {
                    await _szines_negy_evszak_context.PinebatchOrders.AddAsync(pinebatchOrder);
                    await _szines_negy_evszak_context.SaveChangesAsync();
                    return Ok(new
                    {
                        Message = "A fenyőbála rendelést sikeresen rögzítettük",
                        result = pinebatchOrder
                    });
                }
                return BadRequest("A fenyőbála rendeléshez minden mező kitöltése kötelező.");
            }

            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetAllPinebatchOrders()
        {
            try
            {
                return Ok(new
                {
                    Message = "A fenyőbála rendelések lekérése sikeresen megtörtént",
                    result = await _szines_negy_evszak_context.PinebatchOrders.ToListAsync(),
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
