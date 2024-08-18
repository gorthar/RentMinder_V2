using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Tenant : User
    {
        public ICollection<Lease> Leases { get; set; }
    }
}