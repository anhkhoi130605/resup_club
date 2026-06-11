using Microsoft.AspNetCore.Mvc;

namespace ResUpClub.API.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new { message = "API .NET đang chạy!" });
        }
    }
}
