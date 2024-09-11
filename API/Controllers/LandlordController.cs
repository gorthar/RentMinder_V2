using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LandlordController : ControllerBase
    {
        private readonly ILogger<LandlordController> _logger;
        private readonly IUserService _landlordService;

        public LandlordController(ILogger<LandlordController> logger, IUserService landlordService)
        {
            _logger = logger;
            _landlordService = landlordService;
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin(GoogleLoginDto googleLoginDto)
        {
            var result = await _landlordService.GoogleLoginAsync(googleLoginDto);
            if (result.Success)
            {
                _logger.LogInformation("Landlord logged in with google");
                return Ok(result);

            }
            _logger.LogError("Landlord login failed with google, {message}", result.Message);
            return BadRequest(result.Message);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var result = await _landlordService.RegisterAsync(registerDto);
            if (result.Success)
            {
                _logger.LogInformation("Landlord registered");
                return Ok(result);
            }
            _logger.LogError("Landlord registration failed, {message}", result.Message);
            return BadRequest(result.Message);
        }


    }
}