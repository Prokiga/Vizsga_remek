using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class Pinebatchstate
{
    public int BatchStateId { get; set; }

    public string? BatchState { get; set; }

    public virtual ICollection<PinebatchOrder> PinebatchOrders { get; set; } = new List<PinebatchOrder>();
}
