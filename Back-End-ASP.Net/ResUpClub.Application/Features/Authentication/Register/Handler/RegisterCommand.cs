using MediatR;
using ResUpClub.Application.DTOs.Authentication.Register;
using ResUpClub.Application.Features.Authentication.Register;

namespace ResUpClub.Application.Features.Authentication.Register.Handler;

public record RegisterCommand(RegisterUserRequestDTO Request) : IRequest<RegisterResponse>;
