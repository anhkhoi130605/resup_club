using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.AboutUser;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Interfaces.Authentication
{
	public interface IJWTTokenGenerator
	{
		string GenerateToken(string userId, string email, IEnumerable<RoleEnum> Role);
	}
}
