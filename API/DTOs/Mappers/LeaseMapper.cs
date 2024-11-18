using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.Mappers
{
    public static class LeaseMapper
    {
        public static NewLeaseDto ToLeaseDto(this Lease lease)
        {
            return new NewLeaseDto
            {
                Id = lease.Id,
                PropertyId = lease.PropertyId,
                TenantEmail = "",
                StartDate = lease.StartDate,
                EndDate = lease.EndDate,
                MonthlyRent = lease.MonthlyRent,
                SecurityDeposit = lease.SecurityDeposit,
            };
        }

        public static TenantLeaseDto ToTenantLeaseDto(this Lease lease)
        {
            return new TenantLeaseDto
            {
                leaseId = lease.Id,
                PropertyId = lease.PropertyId,
                StartDate = lease.StartDate,
                EndDate = lease.EndDate,
                MonthlyRent = lease.MonthlyRent,
                SecurityDeposit = lease.SecurityDeposit,
                PropertyAddress = ""
            };
        }



    }
}