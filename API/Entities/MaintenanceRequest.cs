using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class MaintenanceRequest
    {
        public int Id { get; set; }

        public string Description { get; set; }

        public DateTime DateSubmitted { get; set; }

        public DateTime? DateResolved { get; set; }

        public string Status { get; set; }

        public decimal? Cost { get; set; }

        public int PropertyId { get; set; }

        public Property Property { get; set; }
    }
}