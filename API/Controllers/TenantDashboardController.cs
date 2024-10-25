using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Tenant")]
    public class TenantDashboardController : ControllerBase
    {
        private readonly ITenantDashboardService _tenantDashboardService;
        public TenantDashboardController(ITenantDashboardService tenantDashboardService)
        {
            _tenantDashboardService = tenantDashboardService;
        }

        [HttpGet]
        public async Task<IActionResult> GetDashboardSummary()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var dashboardSummary = await _tenantDashboardService.GetDashboardSummaryAsync(userId);
            return Ok(dashboardSummary);
        }

    }
}