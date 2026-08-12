using FlowerAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FlowerAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public ActionResult CreateUser([FromBody] User user)
        {
            // Here you would typically save the user to a database
            // For demonstration purposes, we'll just return the user object
            return Ok(user);
        }
    }
}
