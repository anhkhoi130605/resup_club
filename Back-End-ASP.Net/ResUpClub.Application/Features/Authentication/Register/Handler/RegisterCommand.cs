using MediatR;
using ResUpClub.Application.DTOs.Authentication.Register;
using ResUpClub.Application.DTOs.Authentication;

namespace ResUpClub.Application.Features.Authentication.Register.Handler;

public record RegisterCommand(RegisterUserRequestDTO Request) : IRequest<LoginResponseDTO>;
