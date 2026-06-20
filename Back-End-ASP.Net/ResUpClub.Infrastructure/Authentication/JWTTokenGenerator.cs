using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ResUpClub.Infrastructure.Persistence.Configurations.AuthenticationConfig;
using ResUpClub.Application.Interfaces.Authentication;
using static ResUpClub.Domain.Enums.UserEnum;
namespace ResUpClub.Infrastructure.Authentication
{
	public class JWTTokenGenerator : IJWTTokenGenerator
	{
    private readonly JWTConfiguration _jwtOptions;

	public JWTTokenGenerator(JWTConfiguration jwtOptions)
	{
		_jwtOptions = jwtOptions ?? throw new ArgumentNullException(nameof(jwtOptions));
	}
		public string GenerateToken(string userId, string email, IEnumerable<RoleEnum> Role)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtOptions.Key ?? string.Empty);
			var claimList = new List<Claim>
			{
				new Claim(JwtRegisteredClaimNames.Sub, userId),
				new Claim(JwtRegisteredClaimNames.Email, email)
				
			};
			// Thêm Roles vào Claims
			claimList.AddRange(Role.Select(role => new Claim(ClaimTypes.Role, role.ToString())));
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Audience = _jwtOptions.Audience,
				Issuer = _jwtOptions.Issuer,
				Subject = new ClaimsIdentity(claimList),
				Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.ExpiresMinutes),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
