using System.ComponentModel.DataAnnotations;

namespace FlowerAPI.Models.DTO
{
    public class CreateCostumersDTO
    {
        [Required]
        public string? CostumerName { get; set; }
        [Required]
        public string? CostumerTaxnumber { get; set; }
        [Required]
        public int? CostumerPostalCode { get; set; }
        [Required]
        public string? CostumerCity { get; set; }
        [Required]
        public string? CostumerAddress { get; set; }
        [Required]
        public string? CostumerPhonenumber { get; set; }
    }
}
