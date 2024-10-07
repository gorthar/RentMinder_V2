using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LeaseDto
    {
        public int Id { get; set; }
        public string TenantName { get; set; }
        public string PropertyAddress { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public decimal MonthlyRent { get; set; }
        public decimal SecurityDeposit { get; set; }
        public string Status { get; set; }
        public string TenantId { get; set; }
    }
}