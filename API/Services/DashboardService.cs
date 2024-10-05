using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DB;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly PropertyManagementContext _context;

        public DashboardService(PropertyManagementContext context)
        {
            _context = context;
        }

        public async Task<DashboardSummary> GetDashboardSummaryAsync(string userId)
        {
            if (string.IsNullOrEmpty(userId))
                throw new ArgumentException("User ID cannot be null or empty", nameof(userId));

            var currentDate = DateTime.UtcNow;

            var lastMonthDate = currentDate.AddMonths(-1);

            var propertiesQuery = _context.Properties
                .Where(x => x.Landlord.FirebaseUserId == userId);

            var properties = await propertiesQuery.ToListAsync();
            var propertiesLastMonth = properties.Where(x => x.DateAdded <= lastMonthDate).ToList();

            var propertyCount = properties.Count;
            var propertyCountLastMonth = propertiesLastMonth.Count;

            var rentPayments = await _context.RentPayments
                .Where(x => x.Lease.Property.Landlord.FirebaseUserId == userId)
                .ToListAsync();

            var revenue = rentPayments.Sum(x => x.Amount);
            var revenueLastMonth = rentPayments.Where(x => x.PaymentDate <= lastMonthDate).Sum(x => x.Amount);

            var occupancyRate = CalculateOccupancyRate(properties);
            var occupancyRateLastMonth = CalculateOccupancyRate(propertiesLastMonth);

            var maintenanceRequestCount = properties.Sum(x => x.MaintenanceRequests != null ? x.MaintenanceRequests.Count : 0);
            var maintenanceRequestCountLastMonth = propertiesLastMonth.Sum(x => x.MaintenanceRequests != null ? x.MaintenanceRequests.Count : 0);


            return new DashboardSummary
            {
                PropertyCount = new[] { propertyCount, propertyCountLastMonth },
                OccupancyRate = new[] { (int)(occupancyRate * 100), (int)(occupancyRateLastMonth * 100) },
                MaintenanceRequestCount = new[] { maintenanceRequestCount, maintenanceRequestCountLastMonth },
                TotalRevenue = new[] { revenue, revenueLastMonth }
            };
        }

        private double CalculateOccupancyRate(List<Property> properties)
        {
            return properties.Count == 0 ? 0 : (double)properties.Count(x => x.IsOccupied) / properties.Count;
        }
    }
}