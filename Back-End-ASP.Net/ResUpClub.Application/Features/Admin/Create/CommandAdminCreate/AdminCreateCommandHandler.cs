using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using ResUpClub.Application.Interfaces.ManageTrancsaction;
using ResUpClub.Domain.Entities.AboutUser;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Admin.Create.CommandAdminCreate
{
	public class AdminCreateCommandHandler : IRequestHandler<AdminCreateCommand, AdminDTO>
	{
	    private readonly IUnitOfWork _unitOfWork;
		public AdminCreateCommandHandler(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;
		}
    public async Task<AdminDTO> Handle(AdminCreateCommand request, CancellationToken cancellationToken)
	{
		// 1. Validate input and check existing email
		if (string.IsNullOrWhiteSpace(request.Email))
			throw new ArgumentException("Email is required.", nameof(request.Email));

		var exists = await _unitOfWork.User.ExistsByEmailAsync(request.Email);
		if (exists)
			throw new Exception("Tài khoản email này đã tồn tại trên hệ thống.");

		// 2. Ensure default Role exists
		var roleEntity = await _unitOfWork.Roles.GetAsync(r => r.RoleName == RoleEnum.User);
		if (roleEntity == null)
		{
			roleEntity = new Role { RoleName = RoleEnum.User };
			await _unitOfWork.Roles.CreateAsync(roleEntity);
			await _unitOfWork.SaveChangesAsync();
		}

		// 3. Create new user entity
		var newUser = new User
		{
			Email = request.Email,
			FullName = request.FullName,
			PasswordHash = request.Password, // consider hashing in production
			RoleId = roleEntity.Id,
			Role = roleEntity,
			StudentId = string.Empty,
			MemberInOrOutClub = MemberInOrOutClubEnum.OutClub
		};

		await _unitOfWork.User.CreateAsync(newUser);
		await _unitOfWork.SaveChangesAsync();

		// 4. Map to DTO and return
		return new AdminDTO
		{
			Id = Guid.Parse(newUser.Id),
			Email = newUser.Email,
			FullName = newUser.FullName,
			Role = roleEntity.RoleName ?? RoleEnum.User,
			Roles = new List<string> { roleEntity.RoleName?.ToString() ?? RoleEnum.User.ToString() },
			CreatedAt = DateTime.UtcNow,
			Status = UserStatusEnum.Active
		};
	}
	}
}
