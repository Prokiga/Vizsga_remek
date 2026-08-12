using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class Costumer
{
    public int CostumerId { get; set; }

    public string? CostumerName { get; set; }

    public string? CostumerTaxnumber { get; set; }

    public int? CostumerPostalCode { get; set; }

    public string? CostumerCity { get; set; }

    public string? CostumerAddress { get; set; }

    public string? CostumerPhonenumber { get; set; }

    public virtual ICollection<PinebaseOrder> PinebaseOrders { get; set; } = new List<PinebaseOrder>();
}
