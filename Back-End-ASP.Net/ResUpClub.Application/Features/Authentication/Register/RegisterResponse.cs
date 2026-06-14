using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Application.DTOs.Authentication;
using ResUpClub.Application.DTOs.Authentication.Register;

namespace ResUpClub.Application.Features.Authentication.Register
{
	public class RegisterResponse
	{
		public string AccessToken { get; set; } = default!;
		public string RefreshToken { get; set; } = default!;
		public RegisterUserRequestDTO User { get; set; } = default!;
	}
}
