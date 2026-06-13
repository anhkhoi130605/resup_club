using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.AboutUser;

namespace ResUpClub.Application.Interfaces.Authentication
{
	public interface IJWTTokenGenerator
	{
		string GenerateToken(string userId, string email, IEnumerable<string> Role);
	}
}
