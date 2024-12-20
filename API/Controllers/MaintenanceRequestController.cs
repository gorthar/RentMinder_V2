using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DB;
using API.DTOs;
using API.DTOs.Mappers;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaintenanceRequestController : ControllerBase
    {
        private readonly PropertyManagementContext _context;
        public MaintenanceRequestController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<PagedResult<MaintenanceRequestDto>>> GetMaintenanceRequests([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var query = _context.MaintenanceRequests
                .Where(m => m.Property.LandlordId == userId || m.Property.Leases.Any(l => l.TenantId == userId))
                .Select(m => new MaintenanceRequestDto
                {
                    Id = m.Id,
                    PropertyAddress = m.Property.Address,
                    Description = m.Description,
                    DateSubmitted = m.DateSubmitted,
                    Status = m.Status,
                    Urgency = m.Urgency
                });

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new PagedResult<MaintenanceRequestDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            });
        }
        [HttpGet("MaintenanceRequest/")]
        [Authorize]
        public async Task<ActionResult<PagedResult<MaintenanceRequestDto>>> GetMaintenanceRequestsByPropertyId([FromQuery] int Id, [FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var query = _context.MaintenanceRequests
                .Where(m => m.Property.LandlordId == userId || m.Property.Leases.Any(l => l.TenantId == userId) && m.PropertyId == Id)
                .Select(m => new MaintenanceRequestDto
                {
                    Id = m.Id,
                    PropertyAddress = m.Property.Address,
                    Description = m.Description,
                    DateSubmitted = m.DateSubmitted,
                    Status = m.Status,
                    Urgency = m.Urgency,
                    Cost = m.Cost
                });

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new PagedResult<MaintenanceRequestDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            });
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<MaintenanceRequestDto>> GetMaintenanceRequest(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User not authenticated");
            }

            var maintenanceRequest = await _context.MaintenanceRequests
                .Include(m => m.Property)
                .Include(m => m.Property.Leases)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (maintenanceRequest == null)
            {
                return NotFound("Maintenance request not found");
            }

            if (maintenanceRequest.Property == null)
            {
                return NotFound("Associated property not found");
            }

            // Check if user is either the landlord or a tenant of the property
            bool isLandlord = maintenanceRequest.Property.LandlordId == userId;
            bool isTenant = maintenanceRequest.Property.Leases != null &&
                            maintenanceRequest.Property.Leases.Any(l => l.TenantId == userId);

            if (!isLandlord && !isTenant)
            {
                return Unauthorized("You don't have permission to view this maintenance request");
            }

            return maintenanceRequest.ToMaintenanceRequestDto();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MaintenanceRequestDto>> CreateMaintenanceRequest(MaintenanceRequestDto maintenanceRequestDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var property = await _context.Properties.FindAsync(maintenanceRequestDto.PropertyId);
            if (property == null || property.LandlordId != userId)
            {
                return BadRequest("Invalid property ID");
            }

            var maintenanceRequest = maintenanceRequestDto.ToMaintenanceRequest();


            _context.MaintenanceRequests.Add(maintenanceRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaintenanceRequest), new { id = maintenanceRequest.Id }, maintenanceRequestDto);
        }

        [HttpPost("tenant")]
        [Authorize(Roles = "Tenant")]
        public async Task<ActionResult<MaintenanceRequestDto>> CreateTenantMaintenanceRequest(MaintenanceRequestDto maintenanceRequestDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var property = await _context.Properties.FindAsync(maintenanceRequestDto.PropertyId);
            var lease = await _context.Leases
                .Where(l => l.TenantId == userId && l.PropertyId == maintenanceRequestDto.PropertyId)
                .FirstOrDefaultAsync();
            if (property == null || lease == null)
            {
                return BadRequest("Invalid property ID");
            }

            maintenanceRequestDto.DateSubmitted = DateTime.UtcNow;
            var maintenanceRequest = maintenanceRequestDto.ToMaintenanceRequest();

            _context.MaintenanceRequests.Add(maintenanceRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMaintenanceRequest), new { id = maintenanceRequest.Id }, maintenanceRequestDto);
        }
        [HttpGet("tenant")]
        [Authorize(Roles = "Tenant")]
        public async Task<ActionResult<PagedResult<MaintenanceRequestDto>>> GetTenantMaintenanceRequests([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var query = _context.MaintenanceRequests
                .Where(m => m.Property.Leases.Any(l => l.TenantId == userId))
                .Select(m => new MaintenanceRequestDto
                {
                    Id = m.Id,
                    PropertyAddress = m.Property.Address,
                    Description = m.Description,
                    DateSubmitted = m.DateSubmitted,
                    Status = m.Status
                });

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new PagedResult<MaintenanceRequestDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            });
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateMaintenanceRequest(int id, MaintenanceRequestDto maintenanceRequestDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var maintenanceRequest = await _context.MaintenanceRequests.
                Include(m => m.Property)
                .Include(m => m.Property.Leases)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (maintenanceRequest == null || maintenanceRequest.Property.LandlordId != userId && maintenanceRequest.Property.Leases.All(l => l.TenantId != userId))
            {
                return NotFound();
            }

            maintenanceRequest.Description = maintenanceRequestDto.Description;
            maintenanceRequest.Status = maintenanceRequestDto.Status;
            maintenanceRequest.Urgency = maintenanceRequestDto.Urgency;
            maintenanceRequest.Cost = maintenanceRequestDto.Cost;
            maintenanceRequest.DateResolved = maintenanceRequestDto.Status == "Resolved" ? DateTime.UtcNow : (DateTime?)null;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}