using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.DTOs
{
    public class PropertyDtoWithInfo
    {
        public PropertyDto Property { get; set; }
        public List<LeaseDto> Leases { get; set; }
        public List<RentPaymentsDto> RentPayments { get; set; }
        public List<MaintenanceRequestDto> MaintenanceRequests { get; set; }
        public List<Inspection> Inspections { get; set; }
    }
}