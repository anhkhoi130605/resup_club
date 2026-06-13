using System;
using System.Collections.Generic;
using System.Text;

namespace ResUpClub.Application.Interfaces.Authentication
{
	public interface IJWTTokenGenerator
	{
		string GenerateToken(string userId, string email, IEnumerable<string> Role);
	}
}
