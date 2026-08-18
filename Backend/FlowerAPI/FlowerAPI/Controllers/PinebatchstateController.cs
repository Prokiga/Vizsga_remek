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
        public async Task<ActionResult> GetAllPineBatchStates()
        {
            try
            {
                return Ok(new
                {
                    message = "Sikeres lekérdezés",
                    data = await _szinesNegyEvszakContext.Pinebatchstates.Select(x => x.BatchState).ToListAsync()
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
