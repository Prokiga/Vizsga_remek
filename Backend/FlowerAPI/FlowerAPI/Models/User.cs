using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class User
{
    public int UserId { get; set; }

    public string UserName { get; set; } = null!;

    public string PassWord { get; set; } = null!;
}
