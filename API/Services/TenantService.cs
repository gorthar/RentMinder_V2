using System;
using API.DB;
using API.DTOs;
using API.Entities;
using FirebaseAdmin.Auth;

namespace API.Services;

public class TenantService : IUserService
{
    private readonly FirebaseService _firebaseService;
    private readonly PropertyManagementContext _context;
    public TenantService(FirebaseService firebaseService, PropertyManagementContext context)
    {
        _firebaseService = firebaseService;
        _context = context;
    }
    public async Task<GoogleLoginResponse> GoogleLoginAsync(GoogleLoginDto googleLoginDto)
    {
        try
        {
            var token = await _firebaseService.VerifyIdTokenAsync(googleLoginDto.IdToken);
            var user = await _firebaseService.GetUserAsync(token.Uid);
            if (user == null)
            {
                return new GoogleLoginResponse
                {
                    Success = false,
                    User = null,
                    Message = "User not found"
                };
            }

            await _firebaseService.AddRoleClaimAsync(user.Uid, "tenant");

            var tenant = _context.Tenants.FirstOrDefault(x => x.FirebaseUserId == user.Uid);
            if (tenant == null)
            {
                tenant = new Tenant
                {
                    FirebaseUserId = user.Uid,
                    Email = user.Email,
                    FirstName = user.DisplayName,
                    LastName = user.DisplayName,
                    PhoneNumber = user.PhoneNumber,
                    CreatedAt = DateTime.Now,
                    LastLogin = DateTime.Now

                };
                _context.Tenants.Add(tenant);
                await _context.SaveChangesAsync();
            }
            return new GoogleLoginResponse
            {
                Success = true,
                User = tenant
            };
        }
        catch (Exception e)
        {
            return new GoogleLoginResponse
            {
                Success = false,
                User = null,
                Message = e.Message
            };
        }
    }



    public async Task<RegisterResponseDto> RegisterAsync(RegisterDto registerDto)
    {
        var token = _firebaseService.VerifyIdTokenAsync(registerDto.idToken);
        var user = _firebaseService.GetUserAsync(token.Result.Uid);
        if (user != null)
        {
            await _firebaseService.AddRoleClaimAsync(user.Result.Uid, "Tenant");
            var tenant = _context.Tenants.FirstOrDefault(x => x.FirebaseUserId == user.Result.Uid);
            if (tenant == null)
            {
                tenant = new Tenant
                {
                    FirebaseUserId = user.Result.Uid,
                    Email = user.Result.Email,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    PhoneNumber = registerDto.PhoneNumber,
                    CreatedAt = DateTime.Now,
                    LastLogin = DateTime.Now
                };
                _context.Tenants.Add(tenant);
                await _context.SaveChangesAsync();
            }
            else
            {
                return new RegisterResponseDto
                {
                    Success = false,
                    User = null,
                    Message = "User already exists"
                };
            }
            return new RegisterResponseDto
            {
                Success = true,
                User = tenant,
                Message = "User created successfully"

            };
        }
        else
        {
            return new RegisterResponseDto
            {
                Success = false,
                User = null,
                Message = "FUser not found, please try again"
            };
        }

    }
}

