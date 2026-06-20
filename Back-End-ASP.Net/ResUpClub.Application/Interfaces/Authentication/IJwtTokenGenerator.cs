using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.AboutUser;
using System.Collections.Generic;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Interfaces.Authentication
{
    public interface IJWTTokenGenerator
	{
		// Accept role names as strings to make it easier for application layer to pass roles
		string GenerateToken(string userId, string email, IEnumerable<string> roles);
	}
}
