using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.DTOs.Mappers
{
    public static class MaintenanceRequestMapper
    {
        public static MaintenanceRequestDto ToMaintenanceRequestDto(this MaintenanceRequest maintenanceRequest)
        {
            return new MaintenanceRequestDto
            {
                Id = maintenanceRequest.Id,
                PropertyAddress = maintenanceRequest.Property.Address,
                Description = maintenanceRequest.Description,
                DateSubmitted = maintenanceRequest.DateSubmitted,
                Status = maintenanceRequest.Status,
                PropertyId = maintenanceRequest.PropertyId
            };
        }

        public static MaintenanceRequest ToMaintenanceRequest(this MaintenanceRequestDto maintenanceRequestDto)
        {
            return new MaintenanceRequest
            {
                Id = maintenanceRequestDto.Id,
                Description = maintenanceRequestDto.Description,
                DateSubmitted = maintenanceRequestDto.DateSubmitted,
                Status = maintenanceRequestDto.Status,
                PropertyId = maintenanceRequestDto.PropertyId
            };
        }
    }
}