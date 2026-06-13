using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ResUpClub.Application.Common.Authentication;
using ResUpClub.Application.Interfaces.Authentication;
namespace ResUpClub.Infrastructure.Authentication
{
	public class JwtTokenGenerator : IJWTTokenGenerator
	{
    private readonly JWTOptions _jwtOptions;

	public JwtTokenGenerator(JWTOptions jwtOptions)
	{
		_jwtOptions = jwtOptions ?? throw new ArgumentNullException(nameof(jwtOptions));
	}
		public string GenerateToken(string userId, string email, IEnumerable<string> Role)
		{
			var tokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes(_jwtOptions.Secret);
			var claimList = new List<Claim>
			{
				new System.Security.Claims.Claim(JwtRegisteredClaimNames.Sub, userId),
				new System.Security.Claims.Claim(JwtRegisteredClaimNames.Email, email)
			};
			// Thêm Roles vào Claims
			claimList.AddRange(Role.Select(role => new Claim(ClaimTypes.Role, role)));
			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Audience = _jwtOptions.Audience,
				Issuer = _jwtOptions.Issuer,
				Subject = new ClaimsIdentity(claimList),
				Expires = DateTime.UtcNow.AddMinutes(_jwtOptions.ExpiryInMinutes),
				SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
			};

			var token = tokenHandler.CreateToken(tokenDescriptor);
			return tokenHandler.WriteToken(token);
		}
	}
}
