using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DB;
using API.DTOs;
using API.Entities;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PaymentController : ControllerBase
    {
        private readonly PropertyManagementContext _context;

        public PaymentController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<PagedResult<PaymentDto>>> GetPayments([FromQuery] int page = 1, [FromQuery] int size = 5)
        {

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            var query = _context.RentPayments
                .Where(p => p.Lease.TenantId == userId || p.Lease.Property.LandlordId == userId)
                .Select(p => new PaymentDto
                {
                    Id = p.Id,
                    TenantId = p.Lease.TenantId,
                    LandlordId = p.Lease.Property.LandlordId,
                    PaymentDate = p.PaymentDate,
                    Amount = p.Amount,
                    LeaseId = p.LeaseId,
                    PaymentMethod = p.PaymentMethod
                });

            var totalCount = await query.CountAsync();
            var items = await query
                .Skip((page - 1) * size)
                .Take(size)
                .ToListAsync();

            return Ok(new PagedResult<PaymentDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = size
            });


        }

        [HttpPost]
        public async Task<ActionResult<PaymentDto>> CreatePayment(NewPaymentDto paymentDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found");
            }
            var lease = await _context.Leases
                        .Include(l => l.Property)
                        .FirstOrDefaultAsync(l => l.Id == paymentDto.LeaseId);

            if (lease == null)
            {
                return NotFound("Lease not found");
            }

            if (lease.TenantId != userId)
            {
                return Unauthorized("Only tenants can make payments for their own leases");
            }


            var payment = new RentPayment
            {
                PaymentDate = DateTime.UtcNow,
                Amount = paymentDto.Amount,
                LeaseId = paymentDto.LeaseId,
                PaymentMethod = paymentDto.PaymentMethod
            };

            _context.RentPayments.Add(payment);
            await _context.SaveChangesAsync();

            var paymentResponse = new PaymentDto
            {
                Id = payment.Id,
                TenantId = lease.TenantId,
                LandlordId = lease.Property.LandlordId,
                PaymentDate = payment.PaymentDate,
                Amount = payment.Amount,
                LeaseId = payment.LeaseId,
                PaymentMethod = payment.PaymentMethod
            };

            return CreatedAtAction(nameof(GetPayments), new { id = payment.Id }, paymentResponse);
        }
    }

}
