using Microsoft.AspNetCore.Mvc;
using ResUpClub.Application.Common.Authentication; // Thư mục chứa JWTOptions/Interface
using ResUpClub.Application.Interfaces;
using ResUpClub.Application.Interfaces.Authentication; // Thư mục chứa IJwtTokenGenerator

namespace ResUpClub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
	private readonly IJWTTokenGenerator _jwtTokenGenerator;

	// Inject interface vào đây, .NET sẽ tự lấy JwtTokenGenerator ở Infrastructure ra xài
	public AuthController(IJWTTokenGenerator jwtTokenGenerator)
	{
		_jwtTokenGenerator = jwtTokenGenerator;
	}

	[HttpPost("login-test")]
	public IActionResult LoginTest()
	{
		// Giả lập một User hợp lệ sau khi đăng nhập thành công
		var userId = "user-123-abc";
		var email = "testuser@resupclub.com";
		var roles = new List<string> { "Admin", "Member" };

		// Gọi hàm sinh Token xịn
		var token = _jwtTokenGenerator.GenerateToken(userId, email, roles);

		// Trả Token về cho Client xem thử
		return Ok(new
		{
			Success = true,
			Message = "Sinh token thành công!",
			AccessToken = token
		});
	}
}