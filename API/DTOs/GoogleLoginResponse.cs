using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class GoogleLoginResponse
    {
        public string Token { get; set; }
        public User User { get; set; }
        public bool Success { get; set; }
        public string Message { get; set; }
    }
}