using System.ComponentModel.DataAnnotations;

namespace FlowerAPI.Models.DTO
{
    public class UserDTO
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? PassWord { get; set; }
    }
}
