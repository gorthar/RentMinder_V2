using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MaintenanceRequestDto
    {
        public int Id { get; set; }
        public string PropertyAddress { get; set; }
        public string Description { get; set; }
        public DateTime DateSubmitted { get; set; }
        public string Status { get; set; }
        public string Urgency { get; set; }
        public decimal? Cost { get; set; }
        public int PropertyId { get; set; }

    }
}