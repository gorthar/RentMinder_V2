using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RentPaymentsDto
    {
        public int Id { get; set; }
        public int LeaseId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public string TenantName { get; set; }
        public string PropertyAddress { get; set; }

    }
}