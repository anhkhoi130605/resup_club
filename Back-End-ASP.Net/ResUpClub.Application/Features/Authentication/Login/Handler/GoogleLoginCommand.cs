using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using MediatR;
using ResUpClub.Application.DTOs.Authentication;

namespace ResUpClub.Application.Features.Authentication.Login.Handler
{
	public record GoogleLoginCommand(ClaimsPrincipal Principal) : IRequest<LoginResponseDTO>;
}
