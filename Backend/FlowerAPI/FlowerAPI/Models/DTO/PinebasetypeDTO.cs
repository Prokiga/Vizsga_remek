using System.ComponentModel.DataAnnotations;

namespace FlowerAPI.Models.DTO
{
    public class PinebasetypeDTO
    {
        [Required]
        public int BaseId { get; set; }
        [Required]
        public string? BaseType { get; set; }
    }
}
