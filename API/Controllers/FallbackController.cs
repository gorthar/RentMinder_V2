using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [AllowAnonymous]
    public class FallbackController : Controller
    {
        private readonly ILogger<FallbackController> _logger;

        public FallbackController(ILogger<FallbackController> logger)
        {
            _logger = logger;
        }


        public IActionResult Index()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            _logger.LogInformation($"Fallback controller invoked by {userId}");
            _logger.LogWarning("Fallback controller invoked");
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "index.html"), "text/HTML");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View("Error!");
        }
    }
}