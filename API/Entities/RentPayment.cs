using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class RentPayment
    {
        public int Id { get; set; }

        public DateTime PaymentDate { get; set; }

        public decimal Amount { get; set; }

        public string PaymentMethod { get; set; }

        public int LeaseId { get; set; }

        public Lease Lease { get; set; }
    }
}