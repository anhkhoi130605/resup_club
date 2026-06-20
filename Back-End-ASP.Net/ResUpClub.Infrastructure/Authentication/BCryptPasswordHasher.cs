using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Org.BouncyCastle.Crypto.Generators;
using ResUpClub.Application.Interfaces.Authentication;

namespace ResUpClub.Infrastructure.Authentication
{
	public class BCryptPasswordHasher : IPasswordHasher
	{
		public string HashPassword(string password)
		{
			return BCrypt.Net.BCrypt.HashPassword(password);
		}

		public bool VerifyPassword(string password, string hashedPassword)
		{
			return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
		}
	}
}
