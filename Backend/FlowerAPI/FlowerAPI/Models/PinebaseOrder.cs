using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class PinebaseOrder
{
    public int BaseId { get; set; }

    public int? CostumerId { get; set; }

    public int? PineTypeId { get; set; }

    public int? Pinebasetype { get; set; }

    public int? BaseQuantity { get; set; }

    public bool? BaseState { get; set; }

    public DateTime? BaseOrderedDate { get; set; }

    public DateTime? BaseUpdatedAt { get; set; }

    public virtual Costumer? Costumer { get; set; }

    public virtual Pinetype? PineType { get; set; }

    public virtual Pinebasetype? PinebasetypeNavigation { get; set; }
}
