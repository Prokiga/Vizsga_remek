using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class Pinebasetype
{
    public int BaseId { get; set; }

    public string? BaseType { get; set; }

    public virtual ICollection<PinebaseOrder> PinebaseOrders { get; set; } = new List<PinebaseOrder>();
}
