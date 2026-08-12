using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class Pinetype
{
    public int PineId { get; set; }

    public string? PineType { get; set; }

    public virtual ICollection<PinebaseOrder> PinebaseOrders { get; set; } = new List<PinebaseOrder>();

    public virtual ICollection<PinebatchOrder> PinebatchOrders { get; set; } = new List<PinebatchOrder>();
}
