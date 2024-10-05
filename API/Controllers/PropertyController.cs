using API.DB;
using API.DTOs;
using API.DTOs.Mappers;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


[ApiController]
[Route("api/[controller]")]
public class PropertyController : ControllerBase
{
    private readonly PropertyManagementContext _context;

    public PropertyController(PropertyManagementContext context)
    {
        _context = context;
    }

    [HttpGet]
    [Authorize(Roles = "Landlord")]
    public async Task<ActionResult<PagedResult<PropertyDto>>> GetProperties([FromQuery] int page = 1, [FromQuery] int pageSize = 5)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        var query = _context.Properties
            .Where(p => p.LandlordId == userId)
            .AsNoTracking()
            .Select(p => new PropertyDto
            {
                Id = p.Id,
                Address = p.Address,
                Description = p.Description,
                NumberOfBedrooms = p.NumberOfBedrooms,
                NumberOfBathrooms = p.NumberOfBathrooms,
                SquareFootage = p.SquareFootage,
                IsOccupied = p.IsOccupied,
                DateAdded = p.DateAdded,
                LastModified = p.LastModified,
                LandlordId = p.LandlordId
            });

        var totalCount = await query.CountAsync();
        var items = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();

        return Ok(new PagedResult<PropertyDto>
        {
            Items = items,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize
        });
    }


    [HttpGet("{id}")]
    [Authorize(Roles = "Landlord")]
    public async Task<ActionResult<Property>> GetProperty(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var property = await _context.Properties
            .FirstOrDefaultAsync(p => p.Id == id && p.LandlordId == userId);

        if (property == null)
            return NotFound();

        return Ok(property);
    }

    [HttpPost]
    [Authorize(Roles = "Landlord")]
    public async Task<ActionResult<Property>> CreateProperty(PropertyDto property)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var newProperty = property.ToProperty();
        newProperty.LandlordId = userId;
        newProperty.DateAdded = DateTime.UtcNow;
        newProperty.LastModified = DateTime.UtcNow;


        _context.Properties.Add(newProperty);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProperty), new { id = newProperty.Id }, newProperty);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Landlord")]
    public async Task<IActionResult> UpdateProperty(int id, PropertyDto property)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var existingProperty = await _context.Properties
            .FirstOrDefaultAsync(p => p.Id == id && p.LandlordId == userId);

        if (existingProperty == null)
            return NotFound();

        existingProperty.Address = property.Address;
        existingProperty.Description = property.Description;
        existingProperty.NumberOfBedrooms = property.NumberOfBedrooms;
        existingProperty.NumberOfBathrooms = property.NumberOfBathrooms;
        existingProperty.SquareFootage = property.SquareFootage;
        existingProperty.IsOccupied = property.IsOccupied;
        existingProperty.LastModified = DateTime.UtcNow;


        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Landlord")]
    public async Task<IActionResult> DeleteProperty(int id)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var property = await _context.Properties
            .FirstOrDefaultAsync(p => p.Id == id && p.LandlordId == userId);

        if (property == null)
            return NotFound();

        _context.Properties.Remove(property);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    [HttpGet("tenant/")]
    [Authorize(Roles = "Tenant")]
    public async Task<ActionResult<PropertyDto>> GetPropertyOfTenant()
    {
        var tenantId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var lease = await _context.Leases
            .FirstOrDefaultAsync(l => l.TenantId == tenantId);
        if (lease == null)
            return NotFound();
        var property = await _context.Properties
            .FirstOrDefaultAsync(p => p.Id == lease.PropertyId);
        return Ok(property.ToPropertyDto());

    }
}