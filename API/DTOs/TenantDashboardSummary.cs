using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs
{
    public class TenantDashboardSummary
    {
        //Tenant should be able to see their recent(3) transactions, upcoming payments(3 in a month), active leases, and 3 active maintenance requests

        public List<RentPaymentsDto> RecentTransactions { get; set; }
        public List<UpcomingPayment> UpcomingPayments { get; set; }
        public List<NewLeaseDto> ActiveLeases { get; set; }
        public List<MaintenanceRequestDto> RecentMaintenanceRequests { get; set; }
    }
}