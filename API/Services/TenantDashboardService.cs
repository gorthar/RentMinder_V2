using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DB;
using API.DTOs;
using API.DTOs.Mappers;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class TenantDashboardService : ITenantDashboardService
    {
        private readonly PropertyManagementContext _context;

        public TenantDashboardService(PropertyManagementContext context)
        {
            _context = context;
        }

        public async Task<TenantDashboardSummary> GetDashboardSummaryAsync(string userId)
        {
            //Tenant should be able to see their recent transactions, upcoming payments, active leases, and 3 active maintenance requests

            var leases = await _context.Leases
                        .Where(l => l.TenantId == userId)
                        .Select(l => l.ToLeaseDto())
                        .ToListAsync();

            var propertiesQuery = _context.Properties
                                  .Where(p => p.Leases.Any(l => l.TenantId == userId));
            var properties = await propertiesQuery.ToListAsync();

            var upcomingPayments = leases.Select(l => new UpcomingPayment
            {
                LeaseId = l.Id,
                PropertyAddress = properties.First(p => p.Id == l.PropertyId).Address,
                PaymentDueDate = DateTime.Now.Month < 12 ? new DateTime(DateTime.Now.Year, DateTime.Now.Month + 1, 1) : new DateTime(DateTime.Now.Year + 1, 1, 1),
                PaymentAmount = l.MonthlyRent
            }).ToList();

            var recentTransactions = await _context.RentPayments
                                    .Where(p => p.Lease.TenantId == userId)
                                    .OrderByDescending(p => p.PaymentDate)
                                    .Take(5)
                                    .Select(p => new RentPaymentsDto
                                    {
                                        Id = p.Id,
                                        PaymentDate = p.PaymentDate,
                                        Amount = p.Amount,
                                        PaymentMethod = p.PaymentMethod,
                                        LeaseId = p.LeaseId,
                                        PropertyAddress = p.Lease.Property.Address
                                    })
                                    .ToListAsync();

            var currentDate = DateTime.UtcNow;


            var activeMaintenanceRequests = await _context.MaintenanceRequests
                                            .Where(m =>
                                                m.Property.Leases.Any(l =>
                                                    l.TenantId == userId &&
                                                    l.StartDate <= currentDate &&
                                                    l.EndDate >= currentDate) &&
                                                m.DateResolved == null &&
                                                m.Status != "Completed")
                                            .OrderByDescending(m => m.DateSubmitted)
                                            .Select(m => new MaintenanceRequestDto
                                            {
                                                Id = m.Id,
                                                Description = m.Description,
                                                DateSubmitted = m.DateSubmitted,
                                                Status = m.Status,
                                                PropertyId = m.PropertyId,
                                                PropertyAddress = m.Property.Address
                                            })
                                            .ToListAsync();

            return new TenantDashboardSummary
            {
                RecentTransactions = recentTransactions,
                UpcomingPayments = upcomingPayments,
                ActiveLeases = leases,
                RecentMaintenanceRequests = activeMaintenanceRequests
            };

        }
    }
}