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
        [Authorize(Roles = "Landlord")]
        public async Task<ActionResult<PagedResult<MaintenanceRequestDto>>> GetMaintenanceRequests([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var query = _context.MaintenanceRequests
                .Where(m => m.Property.LandlordId == userId)
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
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<MaintenanceRequestDto>> GetMaintenanceRequest(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var maintenanceRequest = await _context.MaintenanceRequests.FindAsync(id);
            if (maintenanceRequest == null || maintenanceRequest.Property.LandlordId != userId)
            {
                return NotFound();
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
    }
}