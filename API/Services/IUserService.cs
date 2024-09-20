using System;
using API.DTOs;

namespace API.Services;

public interface IUserService
{
    Task<RegisterResponseDto> RegisterAsync(RegisterDto registerDto);
    Task<GoogleLoginResponse> GoogleLoginAsync(GoogleLoginDto googleLoginDto);

}
