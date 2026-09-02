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
                if (pinebatchOrderDTO == null)
                {
                    return BadRequest("A fenyőbála rendeléshez minden mező kitöltése kötelező.");
                }

                var pinebatchOrder = new PinebatchOrder
                {
                    PineTypeId = pinebatchOrderDTO.PineTypeId,
                    PinebatchStateId = pinebatchOrderDTO.PinebatchStateId,
                    BatchQuantity = pinebatchOrderDTO.PineBatchQuantity,
                };

                await _szines_negy_evszak_context.PinebatchOrders.AddAsync(pinebatchOrder);
                await _szines_negy_evszak_context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "A fenyőbála rendelést sikeresen rögzítettük",
                    result = pinebatchOrder
                });
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
                var pinebatchOrders = await _szines_negy_evszak_context.PinebatchOrders
                    .Select(u => new
                    {
                        PineTypeId = u.PineTypeId,
                        PinebatchStateId = u.PinebatchStateId,
                        PinebatchState = u.PinebatchState!.BatchState,
                        BatchQuantity = u.BatchQuantity
                    })
                    .ToListAsync();

                return Ok(pinebatchOrders);
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null
                    ? ex.InnerException.Message
                    : ex.Message;

                return BadRequest(realmessage);
            }
        }
    }
}
