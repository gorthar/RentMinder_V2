using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class UpcomingPayment
    {
        public int LeaseId { get; set; }
        public string PropertyAddress { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public decimal PaymentAmount { get; set; }
    }
}