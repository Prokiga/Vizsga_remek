using FlowerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PinebasetypeController : ControllerBase
    {

        private readonly SzinesNegyEvszakContext _szinesNegyEvszakContext;

        public PinebasetypeController(SzinesNegyEvszakContext szinesNegyEvszakContext)
        {
            _szinesNegyEvszakContext = szinesNegyEvszakContext;
        }


        [HttpGet]
        public async Task<ActionResult> GetPineBaseTypes()
        {
            try
            {
                var pinebasetypes = await _szinesNegyEvszakContext.Pinebasetypes
                    .Select(u => new
                    {
                        u.BaseId,
                        u.BaseType
                    })
                    .ToListAsync();
                return Ok(pinebasetypes);
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }
    }
}
