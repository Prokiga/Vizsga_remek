using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class PinebaseOrder
{
    public int BaseId { get; set; }

    public int? CostumerId { get; set; }

    public int? PineTypeId { get; set; }

    public int? Pinebasetype { get; set; }

    public int? BatchQuantity { get; set; }

    public bool? BatchState { get; set; }

    public DateTime? BatchOrderedDate { get; set; }

    public DateTime? BatchUpdatedAt { get; set; }

    public virtual Costumer? Costumer { get; set; }

    public virtual Pinetype? PineType { get; set; }

    public virtual Pinebasetype? PinebasetypeNavigation { get; set; }
}
