using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DB;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LeaseController : ControllerBase
    {
        private readonly PropertyManagementContext _context;

        public LeaseController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize(Roles = "Landlord")]
        public async Task<ActionResult<PagedResult<LeaseDto>>> GetLeases([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var query = _context.Leases
                .Where(l => l.Property.LandlordId == userId)
                .Select(l => new LeaseDto
                {
                    Id = l.Id,
                    TenantName = l.Tenant.FirstName + " " + l.Tenant.LastName,
                    PropertyAddress = l.Property.Address,
                    StartDate = l.StartDate,
                    EndDate = l.EndDate,
                    MonthlyRent = l.MonthlyRent,
                    Status = l.EndDate < DateTime.UtcNow ? "Expired" :
                             l.EndDate < DateTime.UtcNow.AddMonths(1) ? "Expiring Soon" : "Active"
                });

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new PagedResult<LeaseDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            });
        }

        // Additional CRUD methods for Lease...
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<LeaseDto>> GetLease(int id)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var lease = await _context.Leases
                .Where(l => l.Property.LandlordId == userId)
                .Where(l => l.Id == id)
                .Select(l => new LeaseDto
                {
                    Id = l.Id,
                    TenantName = l.Tenant.FirstName + " " + l.Tenant.LastName,
                    PropertyAddress = l.Property.Address,
                    StartDate = l.StartDate,
                    EndDate = l.EndDate,
                    MonthlyRent = l.MonthlyRent,
                    Status = l.EndDate < DateTime.Now ? "Expired" :
                             l.EndDate < DateTime.Now.AddMonths(1) ? "Expiring Soon" : "Active"
                })
                .FirstOrDefaultAsync();

            if (lease == null)
            {
                return NotFound();
            }

            return Ok(lease);
        }

        [HttpPost]
        [Authorize(Roles = "Landlord")]
        public async Task<ActionResult<LeaseDto>> CreateLease(LeaseDto lease)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var property = await _context.Properties
                .Where(p => p.LandlordId == userId)
                .FirstOrDefaultAsync();

            if (property == null)
            {
                return BadRequest("Landlord does not own any properties");
            }

            var newLease = new Lease
            {
                TenantId = lease.TenantId,
                PropertyId = property.Id,
                StartDate = lease.StartDate,
                EndDate = lease.EndDate,
                MonthlyRent = lease.MonthlyRent
            };

            _context.Leases.Add(newLease);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLease), new { id = newLease.Id }, lease);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Landlord")]
        public async Task<IActionResult> UpdateLease(int id, LeaseDto lease)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var existingLease = await _context.Leases
                .Where(l => l.Property.LandlordId == userId)
                .FirstOrDefaultAsync(l => l.Id == id);

            if (existingLease == null)
            {
                return NotFound();
            }

            existingLease.StartDate = lease.StartDate;
            existingLease.EndDate = lease.EndDate;
            existingLease.MonthlyRent = lease.MonthlyRent;

            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}