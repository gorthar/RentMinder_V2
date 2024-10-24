using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public string TenantId { get; set; }
        public string LandlordId { get; set; }
        public DateTime PaymentDate { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public int LeaseId { get; set; }
    }
}