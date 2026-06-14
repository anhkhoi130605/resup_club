using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using ResUpClub.Application.DTOs.Authentication;
using ResUpClub.Application.Interfaces.Authentication;
using ResUpClub.Application.Interfaces.ManageTrancsaction;
using ResUpClub.Domain.Entities.AboutUser;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Authentication.Login.Handler
{
    public class GoogleLoginCommandHandler : IRequestHandler<GoogleLoginCommand, LoginResponseDTO>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IJWTTokenGenerator _jwtTokenGenerator;

        public GoogleLoginCommandHandler(IUnitOfWork unitOfWork, IJWTTokenGenerator jwtTokenGenerator)
        {
            _unitOfWork = unitOfWork;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        public async Task<LoginResponseDTO> Handle(GoogleLoginCommand request, CancellationToken cancellationToken)
        {
            var principal = request.Principal;

            // Extract email
            var email = principal.FindFirst(ClaimTypes.Email)?.Value ?? principal.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Email)?.Value;
            if (string.IsNullOrWhiteSpace(email))
                throw new Exception("Không lấy được email từ Google.");

            // Try find existing user
            var user = await _unitOfWork.User.FindByEmailAsync(email);

            if (user == null)
            {
                // Create default role if missing
                var roleEntity = await _unitOfWork.Roles.GetAsync(r => r.RoleName == RoleEnum.User);
                if (roleEntity == null)
                {
                    roleEntity = new Role { RoleName = RoleEnum.User };
                    await _unitOfWork.Roles.CreateAsync(roleEntity);
                    await _unitOfWork.SaveChangesAsync();
                }

                user = new User
                {
                    Email = email,
                    FullName = principal.FindFirst(ClaimTypes.Name)?.Value ?? string.Empty,
                    PasswordHash = null,
                    RoleId = roleEntity.Id,
                    Role = roleEntity,
                    StudentId = string.Empty,
                    MemberInOrOutClub = MemberInOrOutClubEnum.OutClub,
                };

                await _unitOfWork.User.CreateAsync(user);
                await _unitOfWork.SaveChangesAsync();
            }

            var roleName = user.Role?.RoleName?.ToString() ?? RoleEnum.User.ToString();
            var accessToken = _jwtTokenGenerator.GenerateToken(user.Id, user.Email, new List<string> { roleName });

            return new LoginResponseDTO
            {
                AccessToken = accessToken,
                User = new LoggedinUserDTO
                {
                    Id = user.Id,
                    Email = user.Email,
                    FullName = user.FullName,
                    Role = user.Role?.RoleName.ToString() ?? string.Empty,
                    MemberInOrOutClub = user.MemberInOrOutClub
                }
            };
        }
    }
}
