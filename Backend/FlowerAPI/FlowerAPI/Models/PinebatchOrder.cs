using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class PinebatchOrder
{
    public int BatchId { get; set; }

    public int? PineTypeId { get; set; }

    public int? PinebatchStateId { get; set; }

    public int? BatchQuantity { get; set; }

    public DateTime? BatchArrivedDate { get; set; }

    public DateTime? BatchUpdatedAt { get; set; }

    public virtual Pinetype? PineType { get; set; }

    public virtual Pinebatchstate? PinebatchState { get; set; }
}
