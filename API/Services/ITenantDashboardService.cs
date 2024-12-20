using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;

namespace API.Services
{
    public interface ITenantDashboardService
    {
        Task<TenantDashboardSummary> GetDashboardSummaryAsync(string userId);
    }
}