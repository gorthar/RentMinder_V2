using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Lease
    {
        public int Id { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        [Column(TypeName = "decimal(18, 2)")]

        public decimal MonthlyRent { get; set; }
        [Column(TypeName = "decimal(18, 2)")]

        public decimal SecurityDeposit { get; set; }

        public int PropertyId { get; set; }

        public Property Property { get; set; }

        public string TenantId { get; set; }

        public Tenant Tenant { get; set; }

        public ICollection<RentPayment> RentPayments { get; set; }
    }
}