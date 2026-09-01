using FlowerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PinetypeController : ControllerBase
    {
        private readonly SzinesNegyEvszakContext _szinesNegyEvszakContext;

        public PinetypeController(SzinesNegyEvszakContext szinesNegyEvszakContext)
        {
            _szinesNegyEvszakContext = szinesNegyEvszakContext;
        }

        [HttpGet]
        public async Task<ActionResult> GetPinetypes()
        {
            try
            {
                var pinetypes = await _szinesNegyEvszakContext.Pinetypes
                    .Select(u => new
                    {
                        u.PineId,
                        u.PineType
                    })
                    .ToListAsync();

                 return Ok(pinetypes);

            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }
    }
}
