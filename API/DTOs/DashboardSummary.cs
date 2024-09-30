using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public record DashboardSummary
    {
        public int[] PropertyCount { get; init; }
        public int[] OccupancyRate { get; init; }
        public int[] MaintenanceRequestCount { get; init; }
        public decimal[] TotalRevenue { get; init; }
    }
}