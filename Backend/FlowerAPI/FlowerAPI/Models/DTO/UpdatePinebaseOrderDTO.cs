namespace FlowerAPI.Models.DTO
{
    public class UpdatePinebaseOrderDTO
    {
        public int BaseId { get; set; }

        public int? CostumerId { get; set; }

        public int? PineTypeId { get; set; }

        public int? Pinebasetype { get; set; }

        public int? BaseQuantity { get; set; }

        public bool? BaseState { get; set; }
    }
}
