using FlowerAPI.Models;
using FlowerAPI.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SzinesNegyEvszakContext _szines_negy_evszak_context;

        public UserController(SzinesNegyEvszakContext szines_negy_evszak_context)
        {
            _szines_negy_evszak_context = szines_negy_evszak_context;
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser([FromBody] UserDTO createUserDTO)
        {
            try
            {
                var user = new User
                {
                    UserName = createUserDTO.UserName,
                    PassWord = createUserDTO.PassWord
                };

                if(user != null)
                {
                    await _szines_negy_evszak_context.Users.AddAsync(user);
                    await _szines_negy_evszak_context.SaveChangesAsync();
                    return Ok(new
                    {
                        Message = "A felhasználót sikeresen regisztráltuk",
                        result = user
                    });
                }
                return BadRequest(new { Message = "A felhasználót nem lehett létrehozni!" });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }

        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            try
            {
                return Ok(new
                {
                    message = "Sikeres lekérdezés",
                    result = await _szines_negy_evszak_context.Users.ToListAsync()
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
