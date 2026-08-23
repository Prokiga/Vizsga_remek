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

                if (user != null)
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

        [HttpGet("{name}")]
        public async Task<ActionResult> GetUserByName(string name)
        {
            try
            {
                var user = await _szines_negy_evszak_context.Users.FirstOrDefaultAsync(u => u.UserName == name);
                if (user == null)
                {
                    return NotFound(new { Message = "A felhasználó nem található!" });
                }
                return Ok(new
                {
                    message = "Sikeres lekérdezés",
                    result = user
                });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser([FromQuery] int id, [FromBody] UserDTO updateUserDTO)
        {
            try
            {
                var user = await _szines_negy_evszak_context.Users.FirstOrDefaultAsync(u => u.UserId == id);
                if (user == null)
                {
                    return NotFound(new { Message = "A felhasználó nem található!" });
                }
                user.UserName = updateUserDTO.UserName;
                user.PassWord = updateUserDTO.PassWord;
                _szines_negy_evszak_context.Users.Update(user);
                await _szines_negy_evszak_context.SaveChangesAsync();
                return Ok(new
                {
                    Message = "A felhasználó adatai sikeresen frissítve lettek",
                    result = user
                });
            }
            catch (Exception ex)
            {
                var realmessage = ex.InnerException != null ? ex.InnerException.Message : ex.Message;
                return BadRequest(realmessage);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteUser([FromQuery] int id)
        {
            try
            {
                var user = await _szines_negy_evszak_context.Users.FirstOrDefaultAsync(u => u.UserId == id);
                if (user == null)
                {
                    return NotFound(new { Message = "A felhasználó nem található!" });
                }
                _szines_negy_evszak_context.Users.Remove(user);
                await _szines_negy_evszak_context.SaveChangesAsync();
                return Ok(new
                {
                    Message = "A felhasználó sikeresen törölve lett",
                    result = user
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
