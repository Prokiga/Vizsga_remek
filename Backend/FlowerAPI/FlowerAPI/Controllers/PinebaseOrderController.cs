using FlowerAPI.Models;
using FlowerAPI.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PinebaseOrderController : ControllerBase
    {
        private readonly SzinesNegyEvszakContext _szines_negy_evszak_context;

        public PinebaseOrderController(SzinesNegyEvszakContext szines_negy_evszak_context)
        {
            _szines_negy_evszak_context = szines_negy_evszak_context;
        }

        [HttpPost]
        public async Task<ActionResult> CreatePinebaseOrder([FromBody] PinebaseOrderDTO pinebaseOrderDTO)
        {
            try
            {
                if (pinebaseOrderDTO == null)
                {
                    return BadRequest(new
                    {
                        Message = "A Koszorúalap rendelés adatai hiányoznak!"
                    });
                }

                var pinebaseOrder = new PinebaseOrder
                {
                    CostumerId = pinebaseOrderDTO.CostumerId,
                    PineTypeId = pinebaseOrderDTO.PineTypeId,
                    Pinebasetype = pinebaseOrderDTO.Pinebasetype,
                    BaseQuantity = pinebaseOrderDTO.BaseQuantity,
                    BaseOrderedDate = pinebaseOrderDTO.BaseOrderedDate,
                    BaseState = pinebaseOrderDTO.BaseState
                };

                await _szines_negy_evszak_context.PinebaseOrders.AddAsync(pinebaseOrder);
                await _szines_negy_evszak_context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "A koszorúalap rendelést sikeresen rögzítettük",
                    result = pinebaseOrder
                });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null
                    ? ex.InnerException.Message
                    : ex.Message;

                return BadRequest(realmessage);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetAllPinebaseOrder()
        {
            try
            {
                var pineBaseOrders = await _szines_negy_evszak_context.PinebaseOrders
                    .Select(p => new
                    {
                        p.BaseId,
                        CostumerName = p.Costumer != null
                            ? p.Costumer.CostumerName
                            : "Ismeretlen vevő",

                        BaseOrderedDate = p.BaseOrderedDate,

                        PineType = p.PineType != null
                            ? p.PineType.PineType
                            : "Ismeretlen fenyőfajta",

                        BaseType = p.PinebasetypeNavigation != null
                            ? p.PinebasetypeNavigation.BaseType
                            : "Ismeretlen alap típus",

                        p.BaseState
                    })
                    .ToListAsync();

                return Ok(pineBaseOrders);
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null
                    ? ex.InnerException.Message
                    : ex.Message;

                return BadRequest(realmessage);
            }
        }

        [HttpGet("{BaseId}")]
        public async Task<ActionResult> GetPinebaseOrderById(int BaseId)
        {
            try
            {
                var pinebaseOrder = await _szines_negy_evszak_context.PinebaseOrders.FirstOrDefaultAsync(p => p.BaseId == BaseId);
                if (pinebaseOrder == null)
                {
                    return NotFound(new { Message = "A fenyőalap rendelés nem található!" });
                }
                return Ok(new
                {
                    message = "Sikeres lekérdezés",
                    result = pinebaseOrder
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
