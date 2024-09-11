using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DB;
using API.DTOs;
using API.Entities;

namespace API.Services
{
    public class LandlordService : IUserService
    {
        private readonly FirebaseService _firebaseService;
        private readonly PropertyManagementContext _context;
        public LandlordService(FirebaseService firebaseService, PropertyManagementContext context)
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

                await _firebaseService.AddRoleClaimAsync(user.Uid, "Landlord");

                var landlord = _context.Landlords.FirstOrDefault(x => x.FirebaseUserId == user.Uid);
                if (landlord == null)
                {
                    landlord = new Landlord
                    {
                        FirebaseUserId = user.Uid,
                        Email = user.Email,
                        FirstName = user.DisplayName,
                        LastName = user.DisplayName,
                        PhoneNumber = user.PhoneNumber,
                        CreatedAt = DateTime.UtcNow,
                        LastLogin = DateTime.UtcNow

                    };
                    _context.Landlords.Add(landlord);
                    await _context.SaveChangesAsync();
                }
                return new GoogleLoginResponse
                {
                    Success = true,
                    User = landlord
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
                await _firebaseService.AddRoleClaimAsync(user.Result.Uid, "Landlord");
                var landlord = _context.Landlords.FirstOrDefault(x => x.FirebaseUserId == user.Result.Uid);
                if (landlord == null)
                {
                    landlord = new Landlord
                    {
                        FirebaseUserId = user.Result.Uid,
                        Email = user.Result.Email,
                        FirstName = registerDto.FirstName,
                        LastName = registerDto.LastName,
                        PhoneNumber = registerDto.PhoneNumber,
                        CreatedAt = DateTime.UtcNow,
                        LastLogin = DateTime.UtcNow
                    };
                    _context.Landlords.Add(landlord);
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
                    User = landlord,
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
}