using System.ComponentModel.DataAnnotations;

namespace FlowerAPI.Models.DTO
{
    public class PinebaseOrderDTO
    {
        [Required]
        public int? CostumerId { get; set; }
        [Required]
        public int? PineTypeId { get; set; }
        [Required]
        public int? Pinebasetype { get; set; }
        [Required]
        public int? BatchQuantity { get; set; }
        [Required]
        public DateTime? BatchOrderedDate { get; set; }
    }
}
