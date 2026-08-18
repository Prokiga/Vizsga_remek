using System.ComponentModel.DataAnnotations;

namespace FlowerAPI.Models.DTO
{
    public class PinebatchOrderDTO
    {
        [Required]
        public int? PineTypeId { get; set; }
        [Required]
        public int? PinebatchStateId { get; set; }
        [Required]
        public int? BatchQuantity { get; set; }
    }
}
