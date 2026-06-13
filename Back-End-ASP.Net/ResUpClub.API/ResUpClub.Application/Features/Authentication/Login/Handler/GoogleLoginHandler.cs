using System.Security.Claims;
using MediatR;
using ResUpClub.Domain.Entities.AboutUser;
using ResUpClub.Application.DTOs.Authentication;
using ResUpClub.Application.Interfaces.Authentication;
using ResUpClub.Application.Interfaces.ManageTrancsaction;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Authentication.Login.Handler;

public class GoogleLoginHandler : IRequestHandler<GoogleLoginCommand, LoginResponseDTO>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IJWTTokenGenerator _jwtTokenGenerator;

    public GoogleLoginHandler(IUnitOfWork unitOfWork, IJWTTokenGenerator jwtTokenGenerator)
    {
        _unitOfWork = unitOfWork;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<LoginResponseDTO> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
    {
        var email = request.Principal.FindFirst(ClaimTypes.Email)?.Value;
        var name = request.Principal.FindFirst(ClaimTypes.Name)?.Value ?? string.Empty;

        if (string.IsNullOrWhiteSpace(email))
            throw new Exception("Không thể lấy email từ thông tin xác thực của Google.");

        var existingUser = await _unitOfWork.User.FindByEmailAsync(email);

        Role roleEntity = null;
        if (existingUser == null)
        {
            // ensure role exists
            roleEntity = await _unitOfWork.Roles.GetAsync(r => r.RoleName == RoleEnum.User);
            if (roleEntity == null)
            {
                roleEntity = new Role { RoleName = RoleEnum.User };
                await _unitOfWork.Roles.CreateAsync(roleEntity);
                await _unitOfWork.SaveChangesAsync();
            }

            var newUser = new User
            {
                Email = email,
                FullName = name,
                PasswordHash = string.Empty,
                RoleId = roleEntity.Id,
                Role = roleEntity,
                MemberInOrOutClub = MemberInOrOutClubEnum.OutClub
            };

            await _unitOfWork.User.CreateAsync(newUser);
            await _unitOfWork.SaveChangesAsync();

            existingUser = newUser;
        }

        var roleName = existingUser.Role?.RoleName?.ToString();
        if (string.IsNullOrWhiteSpace(roleName))
        {
            // fallback: try load role entity
            roleEntity ??= await _unitOfWork.Roles.GetAsync(r => r.Id == existingUser.RoleId);
            roleName = roleEntity?.RoleName?.ToString() ?? RoleEnum.User.ToString();
        }

        var accessToken = _jwtTokenGenerator.GenerateToken(existingUser.Id, existingUser.Email, new List<string> { roleName });

        return new LoginResponseDTO
        {
            AccessToken = accessToken,
            User = new LoggedinUserDTO { Email = existingUser.Email, FullName = existingUser.FullName, Role = roleName }
        };
    }
}
