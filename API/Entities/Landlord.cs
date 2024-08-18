using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Landlord:User
    {
        public ICollection<Property> Properties { get; set; }
    }
}