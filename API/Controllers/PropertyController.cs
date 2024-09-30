using API.DB;
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
    public async Task<ActionResult<IEnumerable<Property>>> GetProperties()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var properties = await _context.Properties
            .Where(p => p.LandlordId == userId)
            .ToListAsync();
        return Ok(properties);
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