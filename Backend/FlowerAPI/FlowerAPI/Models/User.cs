using System;
using System.Collections.Generic;

namespace FlowerAPI.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? UserName { get; set; }

    public string? PassWord { get; set; }
}
