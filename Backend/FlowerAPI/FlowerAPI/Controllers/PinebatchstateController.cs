using FlowerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PinebatchstateController : ControllerBase
    {
        private readonly SzinesNegyEvszakContext _szinesNegyEvszakContext;

        public PinebatchstateController(SzinesNegyEvszakContext szinesNegyEvszakContext)
        {
            _szinesNegyEvszakContext = szinesNegyEvszakContext;
        }

        [HttpGet]
        public async Task<ActionResult> GetPineBatchStates()
        {
            try
            {
                var pineBatchStates = await _szinesNegyEvszakContext.Pinebatchstates
                    .Select(u => new
                    {
                        u.BatchStateId,
                        u.BatchState
                    })
                    .ToListAsync();
                return Ok(pineBatchStates);
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }
    }
}
