using System.ComponentModel.DataAnnotations;

namespace FlowerAPI.Models.DTO
{
    public class CreateUserDTO
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        public string? PassWord { get; set; }
    }
}
